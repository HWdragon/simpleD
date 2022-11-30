// Type definitions for ./src/fuc/set_broad.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// SetBroad.!ret

/**
 * 
 */
declare interface Ret {
	
	/**
	 * 
	 */
	resSort : {
				
		/**
		 * reset
		 */
		active : Array<any>;
				
		/**
		 * 
		 */
		other : Array<any>;
				
		/**
		 * 
		 */
		result : /* SetBroad.!ret.resSort.active */ any;
	}
		
	/**
	 * pay one's respects to my "friend", jack.teng  [live broadcast]
	 * if you remember? , my homie
	 * it is better to use reduce
	 * @param data 
	 * @param key 
	 * @return  
	 */
	sortObjItem(data : any, key : any): /* SetBroad.!ret.resSort */ any;
		
	/**
	 * 
	 * @param mes 
	 * @param key 
	 * @param tit 
	 * @return  
	 */
	subscribeMes(mes : any, key : any, tit : any): /* SetBroad.!ret.resSort */ any;
}

/**
 * 
 */
declare interface SetBroad {
		
	/**
	 * 
	 * @return  
	 */
	new (): Ret;
}

