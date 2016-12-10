
function show(paramter,or) {
	var oDiv=document.getElementById('parent').children;
	var oLi=document.getElementById('ul_1').children;
 
	for (var i=0; i<oDiv.length; i++) {
		oDiv[i].style.display="none";
	}
	
	document.getElementById(paramter).style.display='block';
	for (var j=0;j<oLi.length;j++) {
		oLi[j].className='';
	}
	oLi[or].className='active'; 
}

function crud_show(obj1,obj2,_ul,num) {
	var oDiv1=document.getElementById(obj1).children;
	var oDiv2=document.getElementById(obj2);
	var oUl=document.getElementById(_ul).children;
	for (var i=0;i<oDiv1.length;i++) {
		oDiv1[i].style.display='none';
	}
	oDiv2.style.display='block';
	
	for (var j=0;j<oUl.length;j++) {
		oUl[j].className="";
	}
	oUl[num].className="active";
}