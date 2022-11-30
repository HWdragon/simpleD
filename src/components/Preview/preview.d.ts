// Type definitions for ./src/components/Preview/preview.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 
 */
export declare var scale : number;

/**
 * 单指滑动-
 */
declare var offset : {
		
	/**
	 * 
	 */
	left : number;
		
	/**
	 * 
	 */
	top : number;
}

/**
 * offsetX, offsetY 鼠标滚动时，当前鼠标箭头所在屏幕视窗的XY位置
 */
export declare var origin : string;

/**
 * 更新点位
 */
declare var startPoint : {
}

/**
 * 
 */
export declare var isTouching : boolean;

/**
 * 
 */
export declare var isMove : boolean;

/**
 * 
 */
export declare var touches : Map;

/**
 * TODO: 判断双指触摸，并立即记录初始数据
 */
export declare var lastDistance : number;

/**
 * 
 */
export declare var lastScale : number;

/**
 * 
 */
declare var scaleOrigin : {
		
	/**
	 * 
	 */
	x : number;
		
	/**
	 * 
	 */
	y : number;
}

/**
 * 
 */
declare interface Preview {
		
	/**
	 * 
	 * @param props 
	 * @return  
	 */
	new (props : any): Preview;
}

