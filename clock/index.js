setInterval(()=>{

d=new Date();
htime=d.getHours();
mtime=d.getMinutes();
stime=d.getSeconds();


hrotation=30*htime + mtime/2;
mrotation=6*mtime;
srotation=6*stime;

// let hour=document.querySelector("#hour")
// let minute=document.querySelector("#minute")
// let seconds=document.querySelector("#seconds")

hour.style.transform=`rotate(${hrotation}deg)`;
minute.style.transform=`rotate(${mrotation}deg)`;
seconds.style.transform=`rotate(${srotation}deg)`;





},1000);