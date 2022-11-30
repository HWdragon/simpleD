// Type definitions for ./src/fuc/set_array.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace SetArray.prototype{
	// SetArray.prototype.spliceItem.!ret
	type SpliceItemRet = Array<any>;
}

/**
 * 
 */
declare interface SetArray {
		
	/**
	 * 
	 */
	new ();
		
	/**
	 * 
	 * @param data 
	 * @param num 
	 * @return  
	 */
	spliceItem(data : any, num : any): SetArray.prototype.SpliceItemRet;
		
	/**
	 * 
	 * @param obj 
	 * @param key 
	 * @param num 
	 */
	spliceObjItem(obj : any, key : any, num : any): void;
}
