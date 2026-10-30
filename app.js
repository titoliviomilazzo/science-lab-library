const controls = Object.fromEntries(['grade','subject','topic'].map(id=>[id,document.getElementById(id)]));
for (const [key, control] of Object.entries(controls)) {
 const values = [...new Set(simulations.flatMap(item => key === 'grade' ? item.grades : [item[key]]))].sort();
 values.forEach(value => control.add(new Option(value,value)));
 control.addEventListener('change', render);
}
function render() {
 const matches=simulations.filter(item=>(!controls.grade.value || item.grades.includes(controls.grade.value)) && (!controls.subject.value || item.subject===controls.subject.value) && (!controls.topic.value || item.topic===controls.topic.value));
 const list=document.getElementById('list'); list.replaceChildren();
 document.getElementById('count').textContent=`${matches.length} ${matches.length === 1 ? 'simulation' : 'simulations'}`;
 if(!matches.length){const p=document.createElement('p');p.className='empty';p.textContent='No simulations match these filters. Try another grade, subject, or topic.';list.append(p);return;}
 matches.forEach(item=>{const article=document.createElement('article');article.className='row';const img=document.createElement('img');img.src=item.image;img.alt='Screenshot of '+item.title;const content=document.createElement('div');const title=document.createElement('h3');title.textContent=item.title;const description=document.createElement('p');description.textContent=item.description;const meta=document.createElement('small');meta.textContent=`${item.grades.join('–')} · ${item.duration} min · ${item.note}`;content.append(title,description,meta);const link=document.createElement('a');link.className='button';link.href=item.url;link.textContent='Open simulation →';link.setAttribute('aria-label','Open '+item.title);article.append(img,content,link);list.append(article);});
}
render();
