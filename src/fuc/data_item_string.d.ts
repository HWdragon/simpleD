// Type definitions for ./src/fuc/data_item_string.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// simpArr_Str.!ret

/**
 * 
 */
declare interface Ret {
		
	/**
	 * copy source data
	 */
	resultData : Array<any>;
		
	/**
	 * 
	 */
	repeatData : Array<any>;
}

/**
 * 
 * @param dataArr 
 * @param paramsObj 
 * @return  
 */
declare function simpArr_Str(dataArr : any, paramsObj : any): Ret;
