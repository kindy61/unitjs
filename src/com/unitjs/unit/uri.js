/**
UTF-8 NO-BOM
*/
//  /([a-z]+:)(\/{2,3})([^\/:]+)(:\d*)?[^#]*/
//  /^[A-Za-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$/
/**
http://www.oreilly.com:1234/catalog/search.html?q=JavaScript&m=10#results


The “http” scheme is used to locate network resources via the HTTP protocol. This section defines the schemespecific
syntax and semantics for http URLs.

http_URL = "http:" "//" host [ ":" port ] [ abs_path [ "?" query ]]

If the port is empty or not given, port 80 is assumed. The semantics are that the identified resource is located at the
server listening for TCP connections on that port of that host, and the Request-URI for the resource is
abs_path (section 5.1.2). The use of IP addresses in URLs SHOULD be avoided whenever possible (see RFC
1900 [24]). If the abs_path is not present in the URL, it MUST be given as “/” when used as a Request-URI
for a resource (section 5.1.2). If a proxy receives a host name which is not a fully qualified domain name, it MAY
add its domain to the host name it received. If a proxy receives a fully qualified domain name, the proxy MUST
NOT change the host name.

:
/
[A-Za-z0-9-_%]
?
&
#


hash
A read/write string property that specifies the anchor portion of the URL, including the leading hash (#) mark
for example, "#results". This portion of the document URL specifies the name of an anchor within the document.

host
A read/write string property that specifies the hostname and port portions of the URL
for example, "www.oreilly.com:1234".

hostname
A read/write string property that specifies the hostname portion of a URL
for example, "www.oreilly.com".

href
A read/write string property that specifies the complete text of the document's URL, unlike other Location properties that specify only portions of the URL. Setting this property to a new URL causes the browser to read and display the contents of the new URL.

pathname
A read/write string property that specifies the pathname portion of a URL
for example, "/catalog/search.html".

port
A read/write string (not a number) property that specifies the port portion of a URL for example, "1234".

protocol
A read/write string property that specifies the protocol portion of a URL, including the trailing colonfor example, "http:".

search
A read/write string property that specifies the query portion of a URL, including the leading question markfor example, "?q=JavaScript&m=10".
*/
/**
function (){
//http://www.oreilly.com:1234/catalog/search.html?q=JavaScript&m=10#results
	var url='http://www.oreilly.com:1234/catalog/sdf/f/search.html?q=JavaScript&m=10#results';
	var d=document;
	d.write(url);d.close();
	var s1,s2,s3,s4,s5;
	s1=url.split('#');
	console.log('hash___'+(s1[1]||''));
	s2=s1[0].split('?');
	console.log('search___'+(s2[1]||''));
	s3=s2[0].split('//');
	console.log('protocol___'+s3[0]);
	s4=s3[1].split('/');
	console.log('host___'+s4[0]);
	console.log('file___'+(s4[s4.length-1]||''));
	s5=[];
	for(var i=1;i<s4.length-1;++i){
		s5.push(s4[i]+'/');
	};
	console.log('path___'+('/'+s5.join('')));
	s5=s4[0].split(':');
	console.log('prot___'+(s5[1]||''));
	console.log('hostname___'+s5[0]);
}
*/
Object.prototype.showDetail = function(){
	var reStr="";
	var tmpArray=[], ti;
	if(this instanceof Array){
		for(var i=0; i<this.length; ++i){
			ti=this[i];
			tmpArray.push('"'+ ti +'"');
		};
		reStr=tmpArray.join(',');
		reStr='['+reStr+']';
		return reStr;
	};
	if(this instanceof Object){
		for(var i in this){
			if(this.hasOwnProperty(i)){
				tmpArray.push('"'+i+'":"'+this[i]+'"');
			};
		};
		reStr=tmpArray.join(',');
		reStr='{'+reStr+'}';
		return reStr;
	};
	return this.toString();
};

Array.prototype.indexOf = function(_value){
	if(this.length<1){
		return -1;
	};
	for(var i=0, iM=this.length; i<iM; ++i){
		if(this[i]==_value){
			return i;
		};
	};
	if(i>=iM){
		return -1;
	};
};
Array.prototype.clone = function(){
	var reArray=this.slice(0, this.length);
	return reArray;
};

function Uri(_url){
/**
* url		"http://www.oreilly.com:1234/catalog/search.html?q=JavaScript&m=10#results"
* abspath	"/catalog/search.html"
* dirpath	"/catalog/"
* dirpatha	["catalog"]
* urlbase	"http://www.oreilly.com:1234"
* filename	"search.html"
* protocol	"http:"
* port		"1234"
* hostname	"www.oreilly.com"
* host		"www.oreilly.com:1234"
* search	"?q=JavaScript&m=10"
* hash		"#results"
*/
	this.url="";
	this.abspath='';
	this.dirpath='';
	this.dirpatha=[];
	this.urlbase='';
	this.filename='';
	this.protocol='';
	this.port='';
	this.hostname='';
	this.host='';
	this.search='';
	this.hash='';
	if(_url){
		this.setUrl(_url);
	};
}
Uri.prototype={
	protocols : ['unknow', 'http:', 'https:', 'ftp:', 'file:'],
	ports : {'http:':'80', 'ftp:':'21'},
	setUrl : function(_url){
		if(!_url){return};
		
		var i,iM,ic,j,k;
		var _url=this.url=this.fixUrl(_url);
		
		i=_url.split('#');
		this.hash='#'+ (i[1]||'');
		
		i=i[0].split('?');
		this.search='?'+ (i[1]||'');
		
		i=i[0].split('//');
		j=this.protocols.indexOf(i[0]);
		this.protocol=(j>0?i[0]:this.protocols[0]);
		
		i=i[1].split('/');
		iM=i.length;
		this.filename=(i[iM-1]||'');
		k=['/'];
		for(j=1;j<iM-1;++j){
			this.dirpatha.push(i[j]);
			k.push(i[j]+'/');
		};
		this.dirpath=k.join('');
		this.abspath=this.dirpath+this.filename;
		
		this.host=i[0];
		i=i[0].split(':');
		this.hostname=i[0];
		this.port=(i[1]||this.ports[this.protocol]||'');
		this.urlbase=this.protocol+'//'+this.host;
	},
	setUrl_2 : function(_url){
		if(!_url){return};
		
		var I,i,iM,ic,J,j,jc,k;
		var _url=this.url=this.fixUrl(_url);
		
		i=_url.indexOf('//');
		I=[_url.substring(0,i), _url.substring(i+2)];
		j=this.protocols.indexOf(I[0]);
		this.protocol=(j>0?I[0]:this.protocols[0]);
		
		_url=I[1].replace(/(\/+)/,'/');
		
		I=_url.split('#');
		this.hash='#'+ (I[1]||'');
		
		I=I[0].split('?');
		this.search='?'+ (I[1]||'');
		
		I=I[1].split('/');
		this.filename=I.pop();
		
		this.host=I.unshift()||'';
		J=this.host.split(':');
		this.hostname=J[0];
		this.port=(J[1]||this.ports[this.protocol]||'');
		this.urlbase=this.protocol+'//'+this.host;
		
		iM=I.length;
		for(j=1;j<iM;++j){
			jc=I[j];
			if(jc=='..'){
				this.dirpatha.pop();
			}else if(jc=='.' || jc=='' || jc==undefined || jc==null){
			}else{
				this.dirpatha.push(jc);
			}
		};
		this.dirpath='/'+this.dirpatha.join('/')+'/';
		this.abspath=this.dirpath+this.filename;
	},
	resolve : function(_url){
		if(!_url){return};
		
		_url=this.fixUrl(_url);
		var i,j,jM,jc,k,f;
		if(_url.indexOf('/')==0){
			return new Uri(this.urlbase+_url);
		};
		i=_url.split('/');
		f=i.pop();
		k=this.dirpatha.clone();
		//console.log(k);
		for(j=0,jM=i.length;j<jM;++j){
			jc=i[j];
			switch(jc) {
				case '..':
					k.pop();
					break;
				case '.':
				case '':
					break;
				default:
					k.push(jc)
					break;
			};
		};
		f=this.urlbase+'/'+k.join('/')+'/'+f;
		return new Uri(f);
	},
	fixUrl : function(_url){
		return _url;
	},
	toString : function(){
		var res=this.urlbase+this.abspath+(this.search=='?'?'':this.search)+(this.hash=='#'?'':this.hash);
		return res;
	}
};

if(0){
	var urltxt='http://www.oreilly.com:1234/catalog/a/b/c/d/search.html?q=JavaScript&m=10#results';
	var turl=new Uri(urltxt);
	//document.write(turl.showDetail());
	//document.close();
	var nurltxt='../abc/d/././../d/a.html';
	var tnurl=turl.resolve(nurltxt);
};