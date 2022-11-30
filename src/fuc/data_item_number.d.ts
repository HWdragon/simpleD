// Type definitions for ./src/fuc/data_item_number.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// simpArr_Num.!ret

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
	maxVal : number;
		
	/**
	 * 
	 */
	minVal : number;
}

/**
 * 
 * @param dataArr 
 * @param paramsObj 
 * @return  
 */
declare function simpArr_Num(dataArr : any, paramsObj : any): Ret;
