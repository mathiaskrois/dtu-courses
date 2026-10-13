import './practice.mjs?v=8';
import {civilDate,semesterState,obligationState,nextObligation,calendarWeek} from './course-state.mjs?v=8';
const all = selector => [...document.querySelectorAll(selector)];
const set = (selector,text) => all(selector).forEach(el=>el.textContent=text);
document.body.classList.add('js');
const courseId=document.body.dataset.course||location.pathname.match(/^\/dtu\/(\d{5})\//)?.[1]||'12106';
const courseBase=`/dtu/${courseId}/`;
const storageTerm=document.body.dataset.storageTerm||'fall2026';
const storageKey=`krois.dtu.${courseId}.${storageTerm}.completed`;
let completed={};
try {const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))completed=saved;}catch {}
const dateFormat=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Copenhagen',day:'numeric',month:'long',year:'numeric'});
// Optional reading sections start closed in HTML. Resizing never resets them.
const menus = all('.nav-menu');
for (const menu of menus) menu.addEventListener('toggle', () => {
  if (menu.open) for (const other of menus) if (other !== menu) other.open = false;
});
document.addEventListener('click', event => {
  for (const menu of menus) if (!menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') for (const menu of menus) if (menu.open) {
    menu.open = false; menu.querySelector('summary').focus();
  }
});
let data,selectedWeek=null;
function showWeek(number) {
  all('[data-week-panel]').forEach(panel=>{
    const selected=Number(panel.dataset.weekPanel)===number;
    const changed=selected&&panel.hidden;
    panel.hidden=!selected;
    if(changed&&!matchMedia('(prefers-reduced-motion: reduce)').matches)
      panel.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:180});
  });
  all('[data-select-week]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.selectWeek)===number)));
  const select=document.querySelector('#week-select');if(select)select.value=String(number);
}
function refresh() {
  const now=new Date(),day=civilDate(now);
  set('[data-date]',dateFormat.format(now)+' · Copenhagen');
  set('[data-date-phone]',new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Copenhagen',day:'numeric',month:'short'}).format(now));
  if(!data)return;
  const {course,weeks,obligations}=data;
  const archived=course.archived===true;
  if(archived){
    set('[data-semester]',`${weeks.length} ${(course.studyUnit||'Week').toLowerCase()}s`);
    if(selectedWeek===null&&weeks[0])showWeek(weeks[0].number);
  }else{
  const state=semesterState(day,weeks,course.breakStart,course.breakEnd);
  const week=state.kind==='week'?state.week:null;
  const breakLabel=course.breakLabel||(/^Fall/.test(course.term)?'Autumn break':'Teaching break');
  const first=weeks[0],last=weeks.at(-1),afterBreak=weeks.find(w=>w.start>course.breakEnd);
  const shortDate=value=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',timeZone:'Europe/Copenhagen'}).format(new Date(value+'T12:00:00Z'));
  const currentNumber=week?.number||(state.kind==='break'?afterBreak?.number:state.kind==='before'?first?.number:last?.number);
  const label=week?`Week ${String(week.number).padStart(2,'0')} of ${weeks.length}`:state.kind==='break'?breakLabel:state.kind==='before'?'Semester ahead':state.kind==='empty'?'Weekly plans to confirm':'Teaching complete';
  set('[data-semester]',label);
  set('[data-semester-phone]',week?`Week ${week.number} / ${weeks.length}`:label);
  set('[data-week-dates]',week?`${dateFormat.format(new Date(week.start+'T12:00:00Z'))} – ${dateFormat.format(new Date(week.end+'T12:00:00Z'))}`:state.kind==='break'?`${shortDate(course.breakStart)} – ${shortDate(course.breakEnd)} · No teaching week`:state.kind==='before'?`Week ${first.number} starts ${dateFormat.format(new Date(first.start+'T12:00:00Z'))}`:last?`Week ${last.number} ended ${dateFormat.format(new Date(last.end+'T12:00:00Z'))}`:'Weekly dates to confirm');
  const calendarNote=state.kind==='break'?`Week ${afterBreak?.number||''} starts ${afterBreak?shortDate(afterBreak.start):'after the break'}`:week&&weeks[weeks.indexOf(week)+1]?.start>course.breakEnd&&week.end<course.breakStart?`${breakLabel} next week`:week&&afterBreak&&week.number===afterBreak.number?'Back after the teaching break':state.kind==='after'?(course.noExam?'Project dates remain below':obligations.some(o=>o.id==='exam')?'Submission and exam dates remain below':'Submission dates remain below'):`${weeks.length} teaching weeks${course.breakStart?`, with a break in week ${calendarWeek(course.breakStart)}`:''}`;
  set('[data-calendar]',`Calendar week ${calendarWeek(day)} · ${calendarNote}`);
  const currentLink=document.querySelector('[data-current-week]');
  if(currentLink&&currentNumber){currentLink.href=`${courseBase}weeks/${currentNumber}/`;currentLink.textContent=state.kind==='break'?`Preview week ${currentNumber} →`:state.kind==='after'?`Review week ${currentNumber} →`:'Open the weekly plan →';}
  all('[data-track]').forEach(el=>{const w=weeks.find(w=>w.number===Number(el.dataset.track));el.classList.toggle('elapsed',day>w.end);el.classList.toggle('current',week?.number===w.number);});
  all('[data-week-nav]').forEach(el=>el.classList.toggle('is-current-week',Number(el.dataset.weekNav)===week?.number));
  all('[data-current-marker]').forEach(el=>{el.classList.toggle('is-now',Number(el.dataset.currentMarker)===week?.number);el.parentElement.classList.toggle('is-now',Number(el.dataset.currentMarker)===week?.number);});
  all('[data-tile]').forEach(el=>el.classList.toggle('is-current',Number(el.dataset.tile)===week?.number));
  if(selectedWeek===null&&currentNumber)showWeek(currentNumber);
  }
  for(const item of obligations){
    const status=archived ? completed[item.id]===true ? 'complete' : item.due||item.dateOnly ? 'historical' : 'undated' : obligationState(item,now,completed[item.id]===true);
    const text={historical:'Historical date',passed:'Deadline passed',complete:'Marked complete',soon:'Due within 7 days',today:item.id==='exam'?'Exam today · check time':'Due today · check time',upcoming:'Upcoming',undated:'Date unconfirmed'}[status];
    all(`[data-obligation="${item.id}"]`).forEach(card=>{
      card.classList.toggle('is-complete',status==='complete');
      const badge=card.querySelector('[data-status]');if(badge){badge.textContent=text;badge.className='status '+status;}
    });
    all(`[data-complete="${item.id}"]`).forEach(input=>input.checked=completed[item.id]===true);
  }
  const count=obligations.filter(o=>completed[o.id]===true).length;
  set('[data-completed-count]',`${count} of ${obligations.length} complete`);
  if(archived)return;
  const passed=obligations.filter(o=>obligationState(o,now,completed[o.id]===true)==='passed').length;
  set('[data-past-compact]',passed?`${passed} earlier deadlines to check.`:'Saved on this device.');
  set('[data-past-count]',passed?`${passed} past deadline${passed===1?'':'s'} not marked complete. Check your actual submission status in Learn.`:'Completion reflects your checkboxes, not DTU submission records.');
  set('[data-deadline-summary]',`${count} of ${obligations.length} marked complete${passed?` · ${passed} past dates to check`:''}. All timed deadlines use Copenhagen time.`);
  const next=nextObligation(obligations,now,completed);
  const link=document.querySelector('[data-next-link]');
  if(next){
    set('[data-next-title]',next.title);set('[data-next-description]',`${next.audience} · ${next.description}`);
    set('[data-next-date]',`${next.date} · ${next.time}`);
    const days=next.dateOnly?Math.round((Date.parse(next.dateOnly+'T12:00:00Z')-Date.parse(day+'T12:00:00Z'))/86400000):Math.ceil((Date.parse(next.due)-now.getTime())/86400000);
    set('[data-countdown]',next.dateOnly&&day===next.dateOnly?'Today · time unconfirmed':days===0?'Due today':days===1?'Within 1 day':`In ${days} days`);
    if(link){link.href=`${courseBase}deadlines/#${next.id}`;link.textContent='View requirements →';}
  }else{
    set('[data-next-title]',count===obligations.length?'All obligations marked complete':'No future deadline listed');
    set('[data-next-description]',passed?'Review the past dates and confirm your submission status in DTU Learn.':'Keep an eye on official course announcements for updates.');
    set('[data-next-date]',course.term);set('[data-countdown]','Review your checklist');
    if(link){link.href=courseBase+'deadlines/';link.textContent='Review checklist →';}
  }
}
// Run the date label even on the course directory. Resource filtering does not
// depend on loading the date/completion data.
refresh();
const search=document.querySelector('#resource-search'),group=document.querySelector('#resource-group'),kind=document.querySelector('#resource-type');
function filterResources(){
  if(!search)return;const words=search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);let count=0;
  all('[data-resource]').forEach(row=>{const visible=words.every(w=>row.dataset.search.includes(w))&&(!group.value||row.dataset.group===group.value)&&(!kind.value||row.dataset.kind===kind.value);row.hidden=!visible;if(visible)count++;});
  set('[data-resource-count]',`${count} of ${all('[data-resource]').length} materials`);
  const empty=document.querySelector('[data-empty]');if(empty)empty.hidden=count!==0;
}
if(search){
  [search,group,kind].forEach(el=>el.addEventListener('input',filterResources));
  document.querySelector('[data-clear-filters]').addEventListener('click',()=>{search.value='';group.value='';kind.value='';filterResources();search.focus();});
}
all('[data-select-week]').forEach(button=>button.addEventListener('click',()=>{selectedWeek=Number(button.dataset.selectWeek);showWeek(selectedWeek);}));
document.querySelector('[data-return-current]')?.addEventListener('click',()=>{selectedWeek=null;refresh();});
document.querySelector('#week-select')?.addEventListener('change',event=>{selectedWeek=Number(event.target.value);showWeek(selectedWeek);});
if(document.body.dataset.course)try{
  const response=await fetch(courseBase+'runtime.json');if(!response.ok)throw new Error('Course data unavailable');data=await response.json();
  all('[data-complete]').forEach(input=>{
    input.disabled=false;
    input.addEventListener('change',()=>{
      completed[input.dataset.complete]=input.checked;
      try{localStorage.setItem(storageKey,JSON.stringify(completed));}catch{
        let notice=document.querySelector('[data-storage-notice]');
        if(!notice){notice=document.createElement('p');notice.className='notice';notice.dataset.storageNotice='';notice.setAttribute('role','status');document.querySelector('main').append(notice);}
        notice.textContent='Browser storage is unavailable. Completion will last only while this page is open.';
      }
      refresh();
    });
  });
  refresh();setInterval(refresh,30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  window.addEventListener('storage',event=>{if(event.key!==storageKey)return;try{const value=JSON.parse(event.newValue||'{}');completed=value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{completed={};}refresh();});
}catch{set('[data-semester]','Browse all weekly plans');set('[data-countdown]','All dates below');set('[data-next-description]','The live tracker could not load. All official dates and weekly plans remain available below.');}
