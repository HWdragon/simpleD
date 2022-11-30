// Type definitions for ./src/fuc/data_item_object.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// simpArr_Obj.!ret

/**
 * 
 */
declare interface Ret {
		
	/**
	 * copy source data
	 */
	resultData : Array<simpArr_Obj.!ret.ResultDataI>;
	
	/**
	 * 
	 */
	filterResult : {
				
		/**
		 * selected index
		 */
		filterIndex : Array<number>;
	}
	
	/**
	 * 
	 */
	repeatKeysResult : {
				
		/**
		 * 
		 */
		res : Array</* simpArr_Obj.!ret.resultData.<i> */ any>;
				
		/**
		 * 
		 */
		repeat : Array</* simpArr_Obj.!ret.resultData.<i> */ any>;
	}
		
	/**
	 * 
	 */
	sortResult : Array<any>;
	
	/**
	 * 
	 */
	maxObj : {
	}
	
	/**
	 * 
	 */
	minObj : {
	}
	
	/**
	 * 
	 */
	keyVlaueObj : {
	}
	
	/**
	 * 
	 */
	selectAmountResult : {
	}
}
declare namespace SimpArr_ObjRet{
	// simpArr_Obj.!ret.resultData.<i>
	
	/**
	 * 
	 */
	interface ResultDataI {
				
		/**
		 * 
		 */
		key : number;
	}
}

/**
 * 
 * @param dataArr 
 * @param paramsObj 
 * @return  
 */
declare function simpArr_Obj(dataArr : any, paramsObj : any): Ret;
