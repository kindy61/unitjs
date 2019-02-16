/**UTF-8 NO-BOM
*/
Object.prototype.append = function(_elm, _replace){
	var _replace = (typeof _replace == 'undefined') ? true : _replace ? true : false;
	for(var i in _elm){
		if( (typeof this[i] == 'undefined') || _replace ){
			this[i] = _elm[i];
		}
	}
};
/**
* this method has some problem to be resolved.
*/
Object.prototype.getProperties = function(){
	var reStr="";
	var tmpArray=[], ti;
	if(this instanceof Array){
		for(var i=0; i<this.length; ++i){
			ti=this[i];
			tmpArray.push('"'+ ti +'"');
		}
		reStr=tmpArray.join(',');
		reStr='['+reStr+']';
		return reStr;
	}
	if(this instanceof Object){
		for(var i in this){
			if(this.hasOwnProperty(i)){
				tmpArray.push('"'+i+'":"'+this[i]+'"');
			}
		}
		reStr=tmpArray.join(',');
		reStr='{'+reStr+'}';
		return reStr;
	}
	return this.toString();
};
Array.prototype.indexOf = function(_value){
	if(this.length<1){
		return -1;
	}
	for(var i=0, iM=this.length; i<iM; ++i){
		if(this[i]==_value){
			return i;
		}
	}
	if(i>=iM){
		return -1;
	}
};