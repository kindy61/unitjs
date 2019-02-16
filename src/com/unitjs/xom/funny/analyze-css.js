/**
UTF-8 NO-BOM

just copy the code below and paste it in firefox's address bar, then, press Enter.

javascript:var d=document,s=d.createElement('script');s.type="text/javascript"; s.src="http://kindy.googlecode.com/files/get_bg_img_in_css.js?rnd="+Math.random()+".js";d.getElementsByTagName("head")[0].appendChild(s);void(0)

javascript:(function(_s){var d=document,s=d.createElement('script');s.type="text/javascript"; s.src=_s;d.getElementsByTagName("head")[0].appendChild(s);})("http://127.0.0.1:61/test/js/get_bg_img_in_css.js?rnd="+Math.random()+".js");void(0)

*/
/**
CSSStyleSheet[] document.styleSheets	<all <style><link> >
	readonly CSSRule[] @cssRules	<Non IE>
		String @selectorText
		readonly CSS2Properties @style
			String @cssText
			String @['background', 'backgroundColor', 'cssFloat', 'fontFamily' ...]
			
			readonly CSSRule parentRule		<Only in element.@style>
		Number @type
			=3 : CSSImportRule
				String @cssText
				String @href
				String[] @media
					String @mediaText
					appendMedium()
					deleteMedium()
				readonly CSSStyleSheet parentStyleSheet
				CSSStyleSheet styleSheet
			=1 : NormalCssRule
				like:#abc{color:#c00;}
	
	readonly CSSRule[] @rules		<IE>
	boolean @disabled
	readonly String @href
	readonly StyleSheet @parentStyleSheet
		I don't know what is this
	readonly String @title
	readonly String @type
	
	void addRule(String selector			<IE>
				 ,String style
				 [,integer index])
	void removeRule(integer index)			<IE>
	
	unsigned long insertRule(String rule			<Non IE>
							,unsigned long index)
	void deleteRule(unsigned long index)			<Non IE>

In the W3C standards, a CSSRule object may represent any kind of CSS rule, including at-rules such as @import and @page directives.
In IE, however, the CSSRule object represents only the actual style rules of the stylesheet.
*/

function getBgImgInCss(){
//javascript:
var isDebug=true;
var d=document,l=location,lbu=l.protocol+'//'+l.host,s=d.styleSheets,i,ci,j,cj,lW,lD,ius=[],iu,cu,bu,r,r1=/^(.+\/)[^\/]*$/,r2=/([a-z]+):(\/{2,3})([^\/:]+)(:\d*)?[^#]*/,r3=/vvvToRep/,Bl={};
var g={
/**
* string to build url for user load css file into page
*/
	BlUrl:"javascript:(function(_lu,_s){var i,ci,d=document,b=d.body,dh=d.getElementsByTagName('head')[0],r,s;for(i=0;(ci=_lu[i]);++i){r=d.createElement('link');r.rel='stylesheet';r.type='text/css';r.href=ci;dh.appendChild(r);};s=d.createElement('script');s.type='text/javascript';s.src=_s;dh.appendChild(s);})([vvvToRep], 'http://127.0.0.1:61/test/js/get_bg_img_in_css.js?rnd='+Math.random()+'.js');void(0)",
/**
* analyze a style sheet
* <link>
* <style>
* @import
*/
	ss:function(_s){
		var i,ci,crs=_s.cssRules;
		for(i=0;(ci=crs[i]);++i){
			if(ci.type==3){
				g.sU(ci.styleSheet);
				try{
					if(ci.href && bu!=lbu){
						Bl[bu]=Bl[bu]||{};
						Bl[bu][ci.href]=true;
					}else{
						g.ss(ci.styleSheet);
					};
				}catch(e){alert(e);return;};
			}else if(ci.type==1){
				g.sU(_s);
				g.cr(ci);
			};
		};
	},
/**
* analyze a css rule
*/
	cr:function(_c){
		if(_c.style && (iu=_c.style.backgroundImage) && iu!='none'){
			iu=iu.replace(/^url\(/,'').replace(/\)$/,'');
			if(iu.indexOf('/')==0){
				iu=bu+iu;
			}else if(iu.indexOf('://')<0){
				iu=cu+iu;
			};
			ius.push(iu);
		};
	},
/**
* write result to page
*/
	w:function(_c){
		var k,x,y,z,k2;
		lW=window.open('','linksWin');
		if(lW){
			lD=lW.document;
		}else{
			lD=d;
		};
		ius.sort();
		for(i=0;(ci=ius[i]);++i){
			lD.write(ci+'<br />')
		};
		if(i!=0){
			lD.write('<br />all: ['+i+']<br /><br />');
		}
		k=0,x=[];
		for(i in Bl){
			k++;
			ci=Bl[i];
			y=[],z=[];
			y.push('<div style="padding: 4px 4px 6px; margin: 0 0 6px;'+(k%2!=0?(' background-color:#eee;'):'')+'">')
			y.push('<b style="font-size:26px;">'+k+'.</b> Copy code below and click <a href="'+i+'/0/0/0/0/0/0/0.htm" target="_blank">'+i+'</a>, paste the code in address bar and press Enter.');
			y.push('<div style="padding: 5px; border: 1px solid #999;"><textarea style="width:100%;border:none;overflow:hidden;background:transparent;" onmouseover="this.select();">');
			for(j in ci){
				z.push('"'+j+'"');
			}
			z=z.join(',');
			k2=g.BlUrl.replace(r3,z);
			y.push(k2);
			y.push('</textarea></div>');
			y.push('</div>');
			y=y.join('');
			x.push(y);
		};
		if(x.length<=0){return;}
		x=x.join('');
		x='<h3>CSS file in other '+ k +' Domain'+(k>1?'s':'')+'</h3>'+x;
		lD.write(x);
		lD.close();
		k=x=y=z=k2=null;
		setTimeout(function(){lD.close();},300);
	},
/**
* set the css file dir path and root path, to build the image file url
*/
	sU:function(_lu){
		if(_lu.href && _lu.href.length>0){
			cu=_lu.href.replace(r1, "$1");
		}else{
			cu=l.href.replace(r1, "$1");
		};
		bu=cu.replace(r2, "$1:$2$3$4");
	}
};

/**
* analyze all style sheets, and write to page
*/
for(i=0;(ci=s[i]);++i){
	
	if(ci.href && ci.href.length>0){
		g.sU(ci);
		if(bu!=lbu){
			Bl[bu]=Bl[bu]||{};
			Bl[bu][ci.href]=true;
		}
	}else{
		try{
			g.ss(ci);
		}catch(e){alert(e);return;};
	};
};

g.w();

//void(0)
}

setTimeout(getBgImgInCss, 300);


if(0){

/*
javascript:(function(_lu,_s){var i,ci,d=document,b=d.body,dh=d.getElementsByTagName('head')[0],r,s;for(i=0;(ci=_lu[i]);++i){r=d.createElement('link');r.rel='stylesheet';r.type='text/css';r.href=ci;dh.appendChild(r);};s=d.createElement('script');s.type='text/javascript';s.src=_s;dh.appendChild(s);})([vvvToRep], 'http://127.0.0.1:61/test/js/get_bg_img_in_css.js?rnd='+Math.random()+'.js');void(0)

*/
/*
Error:
http://www.flickr.com/photos/jbusch/903124783/
*/

};