import{a as ie,b as oe,c as re}from"./chunk-UGT44UQI.js";import{B as g,C as O,D as n,E as r,F as f,G as v,H as h,I as y,J as S,K as a,L as u,M as K,P as A,Q as X,R as J,S as Z,T as L,U as w,V as q,W as ee,ba as te,da as Q,ea as b,fa as x,ha as j,ia as F,ja as T,ka as k,l as B,la as E,ma as D,na as U,o as P,oa as H,p as W,pa as V,qa as N,r as _,ra as ne,s as M,w as l,x as C,y as Y}from"./chunk-PZAVVGR6.js";var ae=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=P({type:i,selectors:[["app-user"]],decls:1,vars:0,template:function(e,o){e&1&&f(0,"router-outlet")},dependencies:[te],styles:['[_ngcontent-%COMP%]:root{--primary-color: #00203FFF;--primary-background: white;--secondary-background: #ADEFD1FF;--box-shadow: #171717 }html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{box-sizing:border-box;background-color:var(--primary-background);color:var(--primary-color);margin:0;font-family:sans-serif}.hidden[_ngcontent-%COMP%]{display:none!important}.secondary-background[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background)}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}.smallText[_ngcontent-%COMP%]{font-size:small}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.complete[_ngcontent-%COMP%]{background-color:var(--secondary-background)}.delete[_ngcontent-%COMP%]{background-color:red;color:#fff}.loginForm[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]{max-width:600px;display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);gap:1rem;justify-content:center;margin:1rem auto;grid-template-areas:"heading heading" "one two" "three four" "five five"}.loginForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{grid-area:heading;text-align:center;text-decoration:underline}.loginForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%]{grid-area:one}.loginForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%]{grid-area:two}.loginForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{grid-area:three}.loginForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%]{grid-area:four}.loginForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%]{grid-area:five}button[_ngcontent-%COMP%]:disabled{background-color:#a9a9a9!important}']});let s=i;return s})();var _e=["topic"];function Me(s,i){s&1&&(n(0,"p",20),a(1,"Please create a topic in the topic-stats page in order to start a session."),r())}function Pe(s,i){s&1&&(n(0,"p",20),a(1,"Session running..."),r())}function Oe(s,i){if(s&1&&(n(0,"option",24),a(1),r()),s&2){let m=i.$implicit;g("value",m),l(1),u(m)}}function ve(s,i){if(s&1&&(n(0,"select",21,22),O(2,Oe,2,2,"option",23),r()),s&2){let m=y();l(2),g("ngForOf",m.topics)}}var se=s=>({hidden:s});function Se(s,i){if(s&1){let m=v();n(0,"button",11),h("click",function(){_(m);let e=y();return M(e.endSession())}),a(1,"Stop"),r()}if(s&2){let m=y();g("ngClass",A(1,se,!m.sessionRunning))}}var ce=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.sessionRunning=!1,this.topics=[],this.pastProgress={last30HrsStudied:0,last30HrsPerWeek:0,last30Badges:0,allTimeHrsStudied:0,allTimeHrsPerWeek:0,allTimeBadgesEarned:0}}ngOnInit(){this.initializeComponent()}ngAfterViewInit(){this.topics.length!==0&&(this.topic.nativeElement.value=this.topics[0])}initializeComponent(){this.user=this.dataService.user,this.pastProgress.allTimeBadgesEarned=this.user.badges.length,this.user.activeSession&&this.handleSessionObj(this.user.activeSession),this.user.topics.length>0&&(this.topics=this.user.topics.map(t=>t.topic),this.processAllTimeStats(this.user),this.processBadgeStats(this.user),this.processLast30Stats(this.user))}processAllTimeStats(t){this.pastProgress.allTimeHrsStudied=Math.floor(+t.totalTime/60);let e=new Date(t.createDate),o=(Date.now()-e.getTime())/(1e3*60*60*24*7);this.pastProgress.allTimeHrsPerWeek=Math.round(+(Math.floor(+this.user.totalTime/60)/o)*100)/100}processBadgeStats(t){let e=0;for(let c=0;c<t.topics.length;c++){let d=t.topics[c];d.timestamps.length>0&&d.timestamps.forEach(p=>e+=+p.duration)}let o=10*60-e%(10*60);this.hoursToNextBadge=Math.round(o/60*100)/100,this.percentToBadge=Math.floor(+this.hoursToNextBadge/10*100)}processLast30Stats(t){let e=Date.now()-2592e6,o=0;t.topics.forEach(c=>{if(c.timestamps.length>0)for(let d=0;d<c.timestamps.length;d++)new Date(c.timestamps[d].stamp).getTime()>e&&(o+=+c.timestamps[d].duration)}),this.pastProgress.last30HrsStudied=Math.round(+Math.floor(o/60)*100)/100,this.pastProgress.last30HrsPerWeek=Math.round(this.pastProgress.last30HrsStudied*(30/7)*100)/100}handleSessionObj(t){this.sessionTopic=t.topic,this.sessionRunning=!0;let e=new Date,o=new Date(t.start),c=e.getTime()-o.getTime();if(c=Math.floor(c/(60*1e3)),c<60)this.sessionTimeStudied=`${c} mins`;else{let d,p;d=Math.floor(c/60),p=Math.floor(c%60),this.sessionTimeStudied=`${d} hrs ${p} mins`}this.intervalId=setInterval(()=>{let p=new Date().getTime()-o.getTime();if(p=Math.floor(p/(60*1e3)),p<60)this.sessionTimeStudied=`${p} mins`;else{let fe=Math.floor(p/60),Ce=Math.floor(p%60);this.sessionTimeStudied=`${fe} hrs ${Ce} mins`}},60*1e3)}startSession(){if(this.topic.nativeElement.value!==""){let t=this.topic.nativeElement.value;this.http.startSession(t).subscribe(e=>{this.dataService.message.next(e.message),e.user&&(this.dataService.user=e.user,this.initializeComponent())})}else alert("Please select a topic.")}endSession(){if(!this.sessionRunning)return alert("No session is running.");this.http.endSession().subscribe(t=>{this.dataService.message.next(t.message),t.user&&(this.dataService.user=t.user,this.sessionRunning=!1,clearInterval(this.intervalId),this.initializeComponent())})}loadLast30Progress(){for(let t=0;t<this.user.topics.length;t++){let e=this.user.topics[t];for(let o=0;o<e.timestamps.length;o++){let c=Date.now()-2592e6;e.timestamps[o].stamp.getTime()>c&&(this.pastProgress.last30HrsStudied=+this.pastProgress.last30HrsStudied+ +e.timestamps[o].duration)}}this.pastProgress.last30HrsStudied=Number((this.pastProgress.allTimeHrsStudied/60).toFixed(2)),this.pastProgress.last30HrsPerWeek=+this.pastProgress.last30HrsStudied/(30/7),this.pastProgress.last30Badges=Math.floor(this.pastProgress.last30HrsStudied/10)}ngOnDestroy(){this.sessionRunning&&(this.dataService.message.next("Ending session..."),this.endSession())}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-session"]],viewQuery:function(e,o){if(e&1&&J(_e,5),e&2){let c;X(c=Z())&&(o.topic=c.first)}},decls:49,vars:16,consts:[[1,"secondary-background"],[1,"sessionContainer"],[1,"one"],[1,"two"],[1,"three"],[1,"four"],[1,"five"],[1,"six"],["class","centered",4,"ngIf"],[1,"sessionControls"],["name","topic",4,"ngIf"],[3,"ngClass","click"],[3,"ngClass","click",4,"ngIf"],[1,"pastProgressContainer"],[1,"seven"],[1,"eight"],[1,"nine"],[1,"ten"],[1,"eleven"],[1,"twelve"],[1,"centered"],["name","topic"],["topic",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,o){e&1&&(n(0,"div",0)(1,"h1"),a(2,"This Session"),r(),n(3,"div",1)(4,"h3",2),a(5,"Time Studied"),r(),n(6,"h3",3),a(7,"Hours to Next Badge"),r(),n(8,"h3",4),a(9,"Percent to Badge"),r(),n(10,"h2",5),a(11),r(),n(12,"h2",6),a(13),r(),n(14,"h2",7),a(15),r()(),O(16,Me,2,0,"p",8)(17,Pe,2,0,"p",8),n(18,"div",9),O(19,ve,3,1,"select",10),n(20,"button",11),h("click",function(){return o.startSession()}),a(21,"Start"),r(),O(22,Se,2,3,"button",12),r()(),n(23,"h1"),a(24,"Past Performance"),r(),n(25,"div",13),f(26,"h3",2),n(27,"h3",3),a(28,"Hours Studied"),r(),n(29,"h3",4),a(30,"Hours per Week"),r(),n(31,"h3",5),a(32,"Badges Earned"),r(),n(33,"h2",6),a(34,"Last 30 Days"),r(),n(35,"h2",7),a(36),r(),n(37,"h2",14),a(38),r(),n(39,"h2",15),a(40),r(),n(41,"h2",16),a(42,"All Time"),r(),n(43,"h2",17),a(44),r(),n(45,"h2",18),a(46),r(),n(47,"h2",19),a(48),r()()),e&2&&(l(11),u(o.sessionTimeStudied),l(2),u(o.hoursToNextBadge),l(2),K("",o.percentToBadge,"%"),l(1),g("ngIf",o.topics.length===0),l(1),g("ngIf",o.sessionRunning),l(2),g("ngIf",o.topics.length!==0),l(1),g("ngClass",A(14,se,o.sessionRunning)),l(2),g("ngIf",o.topics.length!==0),l(14),u(o.pastProgress.last30HrsStudied),l(2),u(o.pastProgress.last30HrsPerWeek),l(2),u(o.pastProgress.last30Badges),l(4),u(o.pastProgress.allTimeHrsStudied),l(2),u(o.pastProgress.allTimeHrsPerWeek),l(2),u(o.pastProgress.allTimeBadgesEarned))},dependencies:[L,w,q,H,V],styles:['[_ngcontent-%COMP%]:root{--primary-color: #00203FFF;--primary-background: white;--secondary-background: #ADEFD1FF;--box-shadow: #171717 }html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{box-sizing:border-box;background-color:var(--primary-background);color:var(--primary-color);margin:0;font-family:sans-serif}.hidden[_ngcontent-%COMP%]{display:none!important}.secondary-background[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background)}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}.smallText[_ngcontent-%COMP%]{font-size:small}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.complete[_ngcontent-%COMP%]{background-color:var(--secondary-background)}.delete[_ngcontent-%COMP%]{background-color:red;color:#fff}.loginForm[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]{max-width:600px;display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);gap:1rem;justify-content:center;margin:1rem auto;grid-template-areas:"heading heading" "one two" "three four" "five five"}.loginForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{grid-area:heading;text-align:center;text-decoration:underline}.loginForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%]{grid-area:one}.loginForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%]{grid-area:two}.loginForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{grid-area:three}.loginForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%]{grid-area:four}.loginForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%]{grid-area:five}button[_ngcontent-%COMP%]:disabled{background-color:#a9a9a9!important}.sessionContainer[_ngcontent-%COMP%], .pastProgressContainer[_ngcontent-%COMP%]{padding:.5rem;margin-top:2rem;justify-content:center;text-align:center}h1[_ngcontent-%COMP%]{text-align:center;text-decoration:underline}.sessionContainer[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto;grid-template-areas:"one four" "two five" "three six";gap:1rem}.pastProgressContainer[_ngcontent-%COMP%]{padding:1rem;display:grid;grid-template-areas:"one five nine" "two six ten" "three seven eleven" "four eight twelve";gap:1rem}.one[_ngcontent-%COMP%]{grid-area:one}.two[_ngcontent-%COMP%]{grid-area:two}.three[_ngcontent-%COMP%]{grid-area:three}.four[_ngcontent-%COMP%]{grid-area:four}.five[_ngcontent-%COMP%]{grid-area:five}.six[_ngcontent-%COMP%]{grid-area:six}.seven[_ngcontent-%COMP%]{grid-area:seven}.eight[_ngcontent-%COMP%]{grid-area:eight}.nine[_ngcontent-%COMP%]{grid-area:nine}.ten[_ngcontent-%COMP%]{grid-area:ten}.eleven[_ngcontent-%COMP%]{grid-area:eleven}.twelve[_ngcontent-%COMP%]{grid-area:twelve}h3[_ngcontent-%COMP%]{border-bottom:thin solid var(--primary-color)}h3[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{display:inline;width:fit-content;margin:0 auto;align-self:end}.sessionControls[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-evenly;margin:1rem auto;max-width:600px}.sessionControls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .sessionControls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.centered[_ngcontent-%COMP%]{text-align:center}']});let s=i;return s})();function xe(s,i){if(s&1){let m=v();n(0,"li")(1,"span"),a(2),r(),n(3,"button",15),h("click",function(){let o=_(m).index,c=y();return M(c.completeMilestone(o))}),a(4,"\u2713"),r(),n(5,"button",16),h("click",function(){let o=_(m).index,c=y();return M(c.deleteActiveMilestone(o))}),a(6,"X"),r()()}if(s&2){let m=i.$implicit;l(2),u(m.name)}}function ye(s,i){if(s&1){let m=v();n(0,"li")(1,"span"),a(2),r(),n(3,"button",16),h("click",function(){let o=_(m).index,c=y();return M(c.deleteActiveMilestone(o))}),a(4,"X"),r()()}if(s&2){let m=i.$implicit;l(2),u(m.name)}}var le=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.activeMilestones=[],this.completedMilestones=[]}ngOnInit(){this.initializeComponent()}initializeComponent(){let t=this.dataService.user.milestones;for(let e=0;e<t.length;e++)t[e].completed?this.completedMilestones.push(t[e]):this.activeMilestones.push(t[e])}createMilestone(t){this.activeMilestones.push({name:t.value.title,completed:!1})}completeMilestone(t){this.activeMilestones[t].completed=!0,this.completedMilestones.push(this.activeMilestones[t]),this.activeMilestones.splice(t,1)}deleteActiveMilestone(t){this.activeMilestones.splice(t,1)}deleteCompletedMilestone(t){this.activeMilestones.splice(t,1)}saveMilestones(){let t=this.activeMilestones.concat(this.completedMilestones);this.http.updateMilestones(t).subscribe(e=>{this.dataService.message.next(e.message),e.user&&(this.dataService.user=e.user,this.activeMilestones=[],this.completedMilestones=[],this.initializeComponent())})}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-milestones"]],decls:35,vars:2,consts:[[1,"componentContainer"],[1,"milestoneSection"],[1,"milestoneContainer"],[1,"smallText"],[1,"centered"],[4,"ngFor","ngForOf"],[1,"completedMilestoneContainer"],[1,"createMilestoneContainer"],[3,"ngSubmit"],["f","ngForm"],["for","title"],["type","text","name","title","ngModel","","required",""],["type","submit"],[1,"buttonContainer"],[3,"click"],[1,"complete",3,"click"],[1,"delete",3,"click"]],template:function(e,o){if(e&1){let c=v();n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),a(4,"Milestones"),r(),n(5,"ol")(6,"li",3)(7,"span"),a(8,"Milestone"),r(),n(9,"span",4),a(10,"Complete"),r(),n(11,"span",4),a(12,"Delete"),r()(),O(13,xe,7,1,"li",5),r()(),n(14,"div",6)(15,"h1"),a(16,"Completed Milestones"),r(),n(17,"ol")(18,"li",3)(19,"span"),a(20,"Milestone"),r(),n(21,"span",4),a(22,"Delete"),r()(),O(23,ye,5,1,"li",5),r()()(),n(24,"div",7)(25,"form",8,9),h("ngSubmit",function(){_(c);let p=S(26);return M(o.createMilestone(p))}),n(27,"label",10),a(28,"Title:"),r(),f(29,"input",11),n(30,"button",12),a(31,"Submit"),r()()(),n(32,"div",13)(33,"button",14),h("click",function(){return o.saveMilestones()}),a(34,"Save Changes"),r()()()}e&2&&(l(13),g("ngForOf",o.activeMilestones),l(10),g("ngForOf",o.completedMilestones))},dependencies:[w,D,j,F,T,N,E,k],styles:['[_ngcontent-%COMP%]:root{--primary-color: #00203FFF;--primary-background: white;--secondary-background: #ADEFD1FF;--box-shadow: #171717 }html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{box-sizing:border-box;background-color:var(--primary-background);color:var(--primary-color);margin:0;font-family:sans-serif}.hidden[_ngcontent-%COMP%]{display:none!important}.secondary-background[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background)}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}.smallText[_ngcontent-%COMP%]{font-size:small}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.complete[_ngcontent-%COMP%]{background-color:var(--secondary-background)}.delete[_ngcontent-%COMP%]{background-color:red;color:#fff}.loginForm[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]{max-width:600px;display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);gap:1rem;justify-content:center;margin:1rem auto;grid-template-areas:"heading heading" "one two" "three four" "five five"}.loginForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{grid-area:heading;text-align:center;text-decoration:underline}.loginForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%]{grid-area:one}.loginForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%]{grid-area:two}.loginForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{grid-area:three}.loginForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%]{grid-area:four}.loginForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%]{grid-area:five}button[_ngcontent-%COMP%]:disabled{background-color:#a9a9a9!important}.componentContainer[_ngcontent-%COMP%]{background-color:var(--primary-color);color:var(--secondary-background)}h1[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{text-align:center;text-decoration:underline}.milestoneSection[_ngcontent-%COMP%], .buttonContainer[_ngcontent-%COMP%]{padding:.5rem;display:flex;flex-direction:column;max-width:800px;margin:auto}.milestoneContainer[_ngcontent-%COMP%], .completedMilestoneContainer[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;max-width:600px;margin:auto}.milestoneContainer[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%], .completedMilestoneContainer[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]{padding-left:0;justify-content:center;margin:auto}.milestoneContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .completedMilestoneContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto 3.5rem 3rem;gap:1rem;margin-bottom:1rem;align-items:center}.centered[_ngcontent-%COMP%]{text-align:center}.completedMilestoneContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{grid-template-columns:auto 3rem}.milestoneContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .completedMilestoneContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{text-align:center}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-color);background-color:var(--secondary-background);border:none;box-shadow:4px 4px 0 var(--box-shadow);justify-self:center;margin:auto;font-weight:700;min-width:3rem}.createMilestoneContainer[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:1rem;margin:auto;width:fit-content;align-items:center}@media screen and (min-width: 800px){.milestoneSection[_ngcontent-%COMP%]{flex-direction:row;flex-wrap:wrap}}']});let s=i;return s})();var me=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=P({type:i,selectors:[["app-user-dash"]],decls:2,vars:0,template:function(e,o){e&1&&f(0,"app-session")(1,"app-milestones")},dependencies:[ce,le]});let s=i;return s})();var de=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.editorConfig={base_url:"/tinymce",suffix:".min",plugins:"lists link table",toolbar:"numlist bullist link table",menubar:""},this.dangerousKeywords=["import","script","onload","onclick","onerror","script","iframe","object","embed","eval","document.write","setTimeout","javascript:","alert(","confirm(","SELECT","DELETE","UPDATE","DROP","../","file://"]}submitFeedback(t){let e=t.value.feedback;for(let o=0;o<this.dangerousKeywords.length;o++)e.lowerCase().includes(this.dangerousKeywords[o].toLowerCase())?this.handleFeedback():(this.http.createFeedback(e).subscribe(),this.handleFeedback());t.value.feedback=""}handleFeedback(){this.dataService.message.next("Thank you for your feedback"),this.dataService.routerService.next(["user-dash"])}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-user-feedback"]],decls:9,vars:1,consts:[[1,"feedback",3,"ngSubmit"],["f","ngForm"],["id","editor","name","feedback","ngModel","","required","",3,"init"],["type","submit"],[1,"smallText"]],template:function(e,o){if(e&1){let c=v();n(0,"form",0,1),h("ngSubmit",function(){_(c);let p=S(1);return M(o.submitFeedback(p))}),n(2,"h1"),a(3,"Thanks for your Feedback!"),r(),f(4,"editor",2),n(5,"button",3),a(6,"Submit"),r(),n(7,"p",4),a(8,"Your contact email is automatically submitted with your feedback."),r()()}e&2&&(l(4),g("init",o.editorConfig))},dependencies:[D,F,T,N,E,k,oe],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;text-align:center}button[_ngcontent-%COMP%]{line-height:2rem;width:fit-content;margin:1rem auto 0}@media screen and (min-width: 800px){form[_ngcontent-%COMP%]{max-width:90%;margin:auto}}"]});let s=i;return s})();function Fe(s,i){if(s&1&&(n(0,"option",19),a(1),r()),s&2){let m=i.$implicit;l(1),u(m)}}var Te=s=>({"secondary-background":s}),ge=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.updated=new Y,this.topics=[],this.pastProgress={last30HrsStudied:0,last30HrsPerWeek:0,allTimeHrsStudied:0,allTimeHrsPerWeek:0}}ngOnInit(){this.targetObj=this.dataService.user.topics.filter(t=>t.topic===this.topic)[0],this.dataService.user.topics.forEach(t=>this.topics.push(t.topic)),this.processAllTimeStats(),this.processLast30Stats()}processAllTimeStats(){let t=Date.now();if(this.targetObj.timestamps.length>0)for(let o=0;o<this.targetObj.timestamps.length;o++)this.pastProgress.allTimeHrsStudied+=+this.targetObj.timestamps[o].duration,this.targetObj.timestamps[o].stamp.getTime()<t&&(t=this.targetObj.timestamps[o].stamp.getTime());let e=(Date.now()-t)/(1e3*60*60*24*7);this.pastProgress.allTimeHrsPerWeek=Math.round(this.pastProgress.allTimeHrsStudied/e*100)/100,this.pastProgress.allTimeHrsStudied=Math.round(this.pastProgress.allTimeHrsStudied*100)/100}processLast30Stats(){let t=Date.now()-2592e6,e=Date.now();if(this.targetObj.timestamps.length>0)for(let c=0;c<this.targetObj.timestamps.length;c++){let d=this.targetObj.timestamps[c].stamp.getTime();d>t&&d<e?(e=d,this.pastProgress.last30HrsStudied+=+this.targetObj.timestamps[c].duration):d>t&&(this.pastProgress.last30HrsStudied+=+this.targetObj.timestamps[c].duration)}let o=(Date.now()-e)/(1e3*60*60*24*7);this.pastProgress.last30HrsPerWeek=Math.round(this.pastProgress.last30HrsStudied/o*100)/100,this.pastProgress.last30HrsStudied=Math.round(this.pastProgress.last30HrsStudied*100)/100}deleteTopic(t){if(t.value.mergeTopic===this.targetObj.topic)return alert("You cannot marge a topic with itself.");let e;t.value.mergeTopic==="None"?e=confirm(`Are you sure you want to delete ${this.targetObj.topic} and all its timestamps without merging them?  You will lose the recorded time.`):e=confirm(`Are you sure you want to delete ${this.targetObj.topic} and merge its timestamps with ${t.value.mergeTopic} and then delete ${this.targetObj.topic}?  This action is irreversable.`),e&&this.http.deleteTopic(this.targetObj.topic,t.value.mergeTopic).subscribe(o=>{this.dataService.message.next(o.message),o.user&&(this.dataService.user=o.user,this.updated.emit(!0))})}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-topic-stats-detail"]],inputs:{index:"index",topic:"topic"},outputs:{updated:"updated"},decls:32,vars:10,consts:[[1,"detailContainer",3,"ngClass"],[1,"pastProgressContainer"],[1,"one"],[1,"two"],[1,"three"],[1,"four"],[1,"five"],[1,"six"],[1,"seven"],[1,"eight"],[1,"nine"],[1,"deleteContainer",3,"ngSubmit"],["d","ngForm"],[1,"merge"],["for","mergeTopic"],["name","mergeTopic","ngModel","","required",""],["value","None"],["value","Topic 2",4,"ngFor","ngForOf"],["type","submit",1,"delete",3,"disabled"],["value","Topic 2"]],template:function(e,o){if(e&1){let c=v();n(0,"div",0)(1,"h1"),a(2),r(),n(3,"div",1),f(4,"h3",2),n(5,"h3",3),a(6,"Hours Studied"),r(),n(7,"h3",4),a(8,"Hours per Week"),r(),n(9,"h2",5),a(10,"Last Month"),r(),n(11,"h2",6),a(12),r(),n(13,"h2",7),a(14),r(),n(15,"h2",8),a(16,"All Time"),r(),n(17,"h2",9),a(18),r(),n(19,"h2",10),a(20),r()(),n(21,"form",11,12),h("ngSubmit",function(){_(c);let p=S(22);return M(o.deleteTopic(p))}),n(23,"div",13)(24,"label",14),a(25,"Merge Timestamps?"),r(),n(26,"select",15)(27,"option",16),a(28,"None"),r(),O(29,Fe,2,1,"option",17),r()(),n(30,"button",18),a(31,"Delete Topic"),r()()()}if(e&2){let c=S(22);g("ngClass",A(8,Te,o.index%2!==0)),l(2),u(o.targetObj.topic),l(10),u(o.pastProgress.last30HrsStudied),l(2),u(o.pastProgress.last30HrsPerWeek),l(4),u(o.pastProgress.allTimeHrsStudied),l(2),u(o.pastProgress.allTimeHrsPerWeek),l(9),g("ngForOf",o.topics),l(1),g("disabled",!c.valid)}},dependencies:[L,w,D,H,V,U,F,T,N,E,k],styles:['[_ngcontent-%COMP%]:root{--primary-color: #00203FFF;--primary-background: white;--secondary-background: #ADEFD1FF;--box-shadow: #171717 }html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{box-sizing:border-box;background-color:var(--primary-background);color:var(--primary-color);margin:0;font-family:sans-serif}.hidden[_ngcontent-%COMP%]{display:none!important}.secondary-background[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background)}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}.smallText[_ngcontent-%COMP%]{font-size:small}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.complete[_ngcontent-%COMP%]{background-color:var(--secondary-background)}.delete[_ngcontent-%COMP%]{background-color:red;color:#fff}.loginForm[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]{max-width:600px;display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);gap:1rem;justify-content:center;margin:1rem auto;grid-template-areas:"heading heading" "one two" "three four" "five five"}.loginForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{grid-area:heading;text-align:center;text-decoration:underline}.loginForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%]{grid-area:one}.loginForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%]{grid-area:two}.loginForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{grid-area:three}.loginForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%]{grid-area:four}.loginForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%]{grid-area:five}button[_ngcontent-%COMP%]:disabled{background-color:#a9a9a9!important}.detailContainer[_ngcontent-%COMP%]{padding:1rem}h1[_ngcontent-%COMP%]{text-align:center;text-decoration:underline;margin-bottom:0}.pastProgressContainer[_ngcontent-%COMP%]{padding:1rem;display:grid;grid-template-rows:repeat(3,auto)!important;grid-template-columns:1.5fr 1fr 1fr!important;grid-template-areas:"one four seven" "two five eight" "three six nine";gap:1rem;margin-top:1rem;justify-content:center;text-align:center;max-width:600px;margin:auto auto 1rem}.one[_ngcontent-%COMP%]{grid-area:one}.two[_ngcontent-%COMP%]{grid-area:two}.three[_ngcontent-%COMP%]{grid-area:three}.four[_ngcontent-%COMP%]{grid-area:four}.five[_ngcontent-%COMP%]{grid-area:five}.six[_ngcontent-%COMP%]{grid-area:six}.seven[_ngcontent-%COMP%]{grid-area:seven}.eight[_ngcontent-%COMP%]{grid-area:eight}.nine[_ngcontent-%COMP%]{grid-area:nine}h3[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{display:inline;width:fit-content;margin:0 auto;align-self:end}form.deleteContainer[_ngcontent-%COMP%]{display:flex;gap:.5rem;justify-content:center;align-items:center}.merge[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}@media screen and (min-width: 768px){.pastProgressContainer[_ngcontent-%COMP%]{padding:.5rem;margin-top:2rem;display:grid;grid-template-columns:1.5fr repeat(3,1fr);grid-template-rows:2rem .5rem;gap:1rem;justify-content:center;text-align:center}.detailContainer[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background);max-width:600px;border-radius:30px;margin:1rem;box-shadow:4px 4px 0 var(--primary-color)}}']});let s=i;return s})();function Ee(s,i){if(s&1){let m=v();n(0,"app-topic-stats-detail",8),h("updated",function(){_(m);let e=y(2);return M(e.initializeComponent())}),r()}if(s&2){let m=i.$implicit;g("topic",m.topic)}}function De(s,i){if(s&1&&(n(0,"div",6),O(1,Ee,1,1,"app-topic-stats-detail",7),r()),s&2){let m=y();l(1),g("ngForOf",m.topicObjs)}}var pe=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.topicObjs=[]}ngOnInit(){this.initializeComponent()}initializeComponent(){this.topicObjs=[],this.topicObjs=this.dataService.user.topics}createTopic(t){this.http.createTopic(t.value.newTopic).subscribe(e=>{this.dataService.message.next(e.message),e.user&&(this.dataService.user=e.user,this.initializeComponent())})}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-topic-stats"]],decls:8,vars:1,consts:[[1,"addTopic",3,"ngSubmit"],["f","ngForm"],["for","topic"],["placeholder","topic name","name","newTopic","type","text","ngModel","","required",""],["type","submit"],["class","statsContainer",4,"ngIf"],[1,"statsContainer"],[3,"topic","updated",4,"ngFor","ngForOf"],[3,"topic","updated"]],template:function(e,o){if(e&1){let c=v();n(0,"form",0,1),h("ngSubmit",function(){_(c);let p=S(1);return M(o.createTopic(p))}),n(2,"label",2),a(3,"Add a Topic: "),r(),f(4,"input",3),n(5,"button",4),a(6,"Create Topic"),r()(),O(7,De,2,1,"div",5)}e&2&&(l(7),g("ngIf",o.topicObjs.length>0))},dependencies:[w,q,D,j,F,T,N,E,k,ge],styles:['[_ngcontent-%COMP%]:root{--primary-color: #00203FFF;--primary-background: white;--secondary-background: #ADEFD1FF;--box-shadow: #171717 }html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{box-sizing:border-box;background-color:var(--primary-background);color:var(--primary-color);margin:0;font-family:sans-serif}.hidden[_ngcontent-%COMP%]{display:none!important}.secondary-background[_ngcontent-%COMP%]{padding:.5rem;background-color:var(--secondary-background)}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}.smallText[_ngcontent-%COMP%]{font-size:small}button[_ngcontent-%COMP%]{padding:.5rem;color:var(--primary-background);background-color:var(--primary-color);border:none;min-width:100px;font-weight:700}.complete[_ngcontent-%COMP%]{background-color:var(--secondary-background)}.delete[_ngcontent-%COMP%]{background-color:red;color:#fff}.loginForm[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]{max-width:600px;display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);gap:1rem;justify-content:center;margin:1rem auto;grid-template-areas:"heading heading" "one two" "three four" "five five"}.loginForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{grid-area:heading;text-align:center;text-decoration:underline}.loginForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%]{grid-area:one}.loginForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%]{grid-area:two}.loginForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{grid-area:three}.loginForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .four[_ngcontent-%COMP%]{grid-area:four}.loginForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%], .standardForm[_ngcontent-%COMP%]   .five[_ngcontent-%COMP%]{grid-area:five}button[_ngcontent-%COMP%]:disabled{background-color:#a9a9a9!important}.addTopic[_ngcontent-%COMP%]{display:flex;gap:.5rem;margin:1rem auto;justify-content:center;color:var(--primary-color);align-items:center}.statsContainer[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}']});let s=i;return s})();function Ne(s,i){if(s&1&&(n(0,"option",22),a(1),r()),s&2){let m=i.$implicit;g("value",m),l(1),u(m)}}var ue=(()=>{let i=class i{constructor(t,e){this.dataService=t,this.http=e,this.receivesEmailsMess="Turn OFF emails:",this.topics=[]}ngOnInit(){this.userEmail=this.dataService.user.email,this.dataService.user.receivesEmails||(this.receivesEmailsMess="Turn ON emails:"),this.dataService.user.topics.forEach(t=>this.topics.push(t.topic))}updateEmail(t){let e=t.value.email.toLowerCase(),o=t.value.confirmEmail.toLowerCase();if(e!==o)return alert("Email and confirm email must match.");this.http.updateEmail(this.userEmail,e,t.value.password).subscribe(c=>{this.dataService.message.next(c.message),c.user&&(this.dataService.user=c.user,this.userEmail=c.user.email)})}seedTime(t){this.http.seedTime(t.value.seedTime,t.value.seedTopic).subscribe(e=>{this.dataService.message.next(e.message),e.user&&(this.dataService.user=e.user)})}toggleReceiveEmails(){this.http.toggleReceiveEmails().subscribe(t=>{this.dataService.message.next(t.message),t.user&&(this.dataService.user=t.user,this.receivesEmailsMess==="Turn OFF emails:"?this.receivesEmailsMess="Turn ON emails:":this.receivesEmailsMess="Turn OFF emails:")})}deleteUser(){prompt(`Type "delete ${this.userEmail}" to delete your account.`)==="delete "+this.userEmail&&this.http.deleteUser(this.dataService.user._id).subscribe(e=>{this.dataService.message.next(e.message),e.message==="User deleted."&&(this.dataService.loggedIn=!1,this.dataService.user=void 0,this.dataService.role.next(""),localStorage.removeItem("loginData"),this.dataService.routerService.next([""]))})}};i.\u0275fac=function(e){return new(e||i)(C(x),C(b))},i.\u0275cmp=P({type:i,selectors:[["app-settings"]],decls:40,vars:2,consts:[[1,"secondary-background"],[1,"componentContainer"],[3,"ngSubmit"],["e","ngForm"],[1,"one"],["for","email",1,"two"],["name","email","type","email",1,"three"],["for","confirmEmail",1,"four"],["name","confirmEmail","type","email",1,"five"],["for","password"],["type","password","name","password","ngModel","","required",""],["type","submit",1,"six"],["s","ngForm"],["for","Topic",1,"two"],["name","seedTopic","ngModel","","required","",1,"three"],[3,"value",4,"ngFor","ngForOf"],["name","seedTime","for","time",1,"four"],["name","seedTime","type","number",1,"five"],[1,"toggle"],["for","toggleReceiveEmails"],[3,"click"],[1,"delete",3,"click"],[3,"value"]],template:function(e,o){if(e&1){let c=v();n(0,"div",0)(1,"div",1)(2,"h1"),a(3,"User Settings"),r(),n(4,"form",2,3),h("ngSubmit",function(){_(c);let p=S(5);return M(o.updateEmail(p))}),n(6,"h2",4),a(7,"Update Email"),r(),n(8,"label",5),a(9,"New Email:"),r(),f(10,"input",6),n(11,"label",7),a(12,"Confirm Email:"),r(),f(13,"input",8),n(14,"label",9),a(15,"Password:"),r(),f(16,"input",10),n(17,"button",11),a(18,"Submit"),r()(),n(19,"form",2,12),h("ngSubmit",function(){_(c);let p=S(20);return M(o.seedTime(p))}),n(21,"h1",4),a(22,"Seed Study Time"),r(),n(23,"label",13),a(24,"Topic:"),r(),n(25,"select",14),O(26,Ne,2,2,"option",15),r(),n(27,"label",16),a(28,"Add Time (in mins):"),r(),f(29,"input",17),n(30,"button",11),a(31,"Seed Time"),r()(),n(32,"div",18)(33,"label",19),a(34),r(),n(35,"button",20),h("click",function(){return o.toggleReceiveEmails()}),a(36,"Toggle"),r()(),n(37,"div")(38,"button",21),h("click",function(){return o.deleteUser()}),a(39,"Delete Account"),r()()()()}e&2&&(l(26),g("ngForOf",o.topics),l(8),u(o.receivesEmailsMess))},dependencies:[w,D,H,V,j,U,F,T,N,E,k],styles:['.componentContainer[_ngcontent-%COMP%]{max-width:600px;margin:auto;min-height:100vh}h1[_ngcontent-%COMP%]{text-decoration:underline;text-align:center}form[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], div[_ngcontent-%COMP%]{text-align:center}form[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto;grid-template-rows:repeat(4,auto);grid-template-areas:"one one" "two three" "four five" "six six";max-width:90%;margin:auto auto 1rem;gap:1rem}.one[_ngcontent-%COMP%]{grid-area:one}.two[_ngcontent-%COMP%]{grid-area:two}.three[_ngcontent-%COMP%]{grid-area:three}.four[_ngcontent-%COMP%]{grid-area:four}.five[_ngcontent-%COMP%]{grid-area:five}.six[_ngcontent-%COMP%]{grid-area:six;width:fit-content;margin:auto}.toggle[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:1rem;align-items:center;margin:1rem auto}']});let s=i;return s})();var Ie=[{path:"",component:ae,children:[{path:"",component:me},{path:"feedback",component:de},{path:"topic-stats",component:pe},{path:"settings",component:ue}]}],he=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=W({type:i}),i.\u0275inj=B({imports:[Q.forChild(Ie),Q]});let s=i;return s})();var Mt=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=W({type:i}),i.\u0275inj=B({providers:[{provide:ie,useValue:"tinymce/tinymce.min.js"}],imports:[ee,he,ne,re]});let s=i;return s})();export{Mt as UserModule};
