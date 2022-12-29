import React, { useState, useEffect } from 'react';
import './index.less';

let scale = 1;
let offset = { left: 0, top: 0 };
let origin = 'center';

let startPoint = { x: 0, y: 0 }; // 记录初始触摸点位
let isTouching = false; // 标记是否正在移动
let isMove = false; // 正在移动中，与点击做区别
let touches = new Map(); // 触摸点数组
let lastDistance = 0;
let lastScale = 1; // 记录下最后的缩放值
let scaleOrigin = { x: 0, y: 0 };

const { innerWidth: winWidth, innerHeight: winHeight } = window;
let originalEl;
let cloneEl;

// https://juejin.cn/post/7160894692593401893
// https://blog.csdn.net/weixin_44099519/article/details/100930872
const Preview = (props) => {
    useEffect(() => {
      const handle = (e) => {
        e.preventDefault();
        let tar = e.target.classList.contains('_item');
        if (tar) {
          originalEl = e.target; // 缓存原始图DOM节点
          cloneEl = originalEl.cloneNode(true); // (克隆图片) 当设置为true，克隆当前节点，属性及当前节点的后代.若设置为false,仅仅克隆当前元素节点本身
          originalEl.style.opacity = 0;
          openPreview(); // 预览
        }
      };
      document.getElementById('_list').addEventListener('click', handle);
    }, []);
  
    const openPreview = () => {
      scale = 1;
      const { top, left } = originalEl.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = originalEl;
      // 创建蒙层
      const mask = document.createElement('div');
      mask.classList.add('_modal');
      // 添加在body下
      document.body.appendChild(mask);
      // 注册蒙层的点击事件，关闭弹窗 , 遮罩点击事件
      const clickFunc = function () {
        // setTimeout(() => {
        if (isMove) {
          isMove = false;
        } else {
          changeStyle(cloneEl, [
            'transition: all .3s',
            `left: ${left}px`,
            `top: ${top}px`,
            `transform: translate(0,0)`,
            `width: ${offsetWidth}px`,
          ]);
          // setTimeout(() => {
          document.body.removeChild(this);
          originalEl.style.opacity = 1;
          mask.removeEventListener('click', clickFunc);
          // }, 300)
        }
        // }, 280)
      };
      // 注册事件
      mask.addEventListener('click', clickFunc);
      mask.addEventListener('mousewheel', zoom, { passive: false }); // 默认值都为 false
      // 添加图片
      changeStyle(cloneEl, [`left: ${left}px`, `top: ${top}px`]);
      mask.appendChild(cloneEl);
      // 移动图片到屏幕中心位置
      const originalCenterPoint = {
        x: offsetWidth / 2 + left,
        y: offsetHeight / 2 + top,
      };
      const winCenterPoint = { x: winWidth / 2, y: winHeight / 2 };
      const offsetDistance = {
        left: winCenterPoint.x - originalCenterPoint.x + left,
        top: winCenterPoint.y - originalCenterPoint.y + top,
      };
      const diffs = {
        left: ((adaptScale() - 1) * offsetWidth) / 2,
        top: ((adaptScale() - 1) * offsetHeight) / 2,
      };
      changeStyle(cloneEl, [
        'transition: all 0.3s',
        `width: ${offsetWidth * adaptScale() + 'px'}`,
        `transform: translate(${offsetDistance.left - left - diffs.left}px, ${
          offsetDistance.top - top - diffs.top
        }px)`,
      ]);
      // 动画结束后消除定位重置的偏差
      setTimeout(() => {
        changeStyle(cloneEl, [
          'transition: all 0s',
          `left: 0`,
          `top: 0`,
          `transform: translate(${offsetDistance.left - diffs.left}px, ${
            offsetDistance.top - diffs.top
          }px)`,
        ]);
        offset = {
          left: offsetDistance.left - diffs.left,
          top: offsetDistance.top - diffs.top,
        }; // 记录值
      }, 300);
    };
    // 滚轮缩放
    const zoom = (event) => {
      // deltaY 正负表示用户是向上还是向下滚动
      if (!event.deltaY) {
        return;
      }
      event.preventDefault();
      // offsetX, offsetY 鼠标滚动时，当前鼠标箭头所在屏幕视窗的XY位置
      origin = `${event.offsetX}px ${event.offsetY}px`;
      // 缩放执行
      if (event.deltaY < 0) {
        scale += 0.1; // 放大
      } else if (event.deltaY > 0) {
        scale >= 0.2 && (scale -= 0.1); // 缩小
      }
      offset = getOffsetCorrection(event.offsetX, event.offsetY);
      changeStyle(cloneEl, [
        'transition: all .15s',
        `transform-origin: ${origin}`,
        `transform: translate(${offset.left + 'px'}, ${
          offset.top + 'px'
        }) scale(${scale})`,
      ]);
    };
  
    // 获取中心改变的偏差
    const getOffsetCorrection = (x = 0, y = 0) => {
      const touchArr = Array.from(touches);
      if (touchArr.length === 2) {
        const start = touchArr[0][1];
        const end = touchArr[1][1];
        x = (start.offsetX + end.offsetX) / 2;
        y = (start.offsetY + end.offsetY) / 2;
      }
      origin = `${x}px ${y}px`;
      const offsetLeft = (scale - 1) * (x - scaleOrigin.x) + offset.left;
      const offsetTop = (scale - 1) * (y - scaleOrigin.y) + offset.top;
      scaleOrigin = { x, y };
  
      return { left: offsetLeft, top: offsetTop };
    };
    // 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
    const changeStyle = (el, arr) => {
      const original = el.style.cssText.split(';');
      original.pop();
      el.style.cssText = original.concat(arr).join(';') + ';';
    };
    // 计算自适应屏幕的缩放值
    function adaptScale() {
      // 获取文档中图片的宽高
      const { offsetWidth: w, offsetHeight: h } = originalEl;
      let scale = 0;
      scale = winWidth / w;
      if (h * scale > winHeight - 80) {
        scale = (winHeight - 80) / h;
      }
      return scale;
    }
    // 获取距离
    const getDistance = () => {
      const touchArr = Array.from(touches);
      if (touchArr.length < 2) {
        return 0;
      }
      const start = touchArr[0][1];
      const end = touchArr[1][1];
  
      return Math.hypot(end.x - start.x, end.y - start.y);
    };
  
    // 操作事件
    window.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      touches.set(e.pointerId, e); // TODO: 点击存入触摸点
      isTouching = true;
      startPoint = { x: e.clientX, y: e.clientY };
      if (touches.size === 2) {
        // TODO: 判断双指触摸，并立即记录初始数据
        lastDistance = getDistance();
        lastScale = scale;
      }
    });
    window.addEventListener('pointerup', function (e) {
      touches.delete(e.pointerId); // TODO: 抬起移除触摸点
      if (touches.size <= 0) {
        isTouching = false;
      } else {
        const touchArr = Array.from(touches);
        // 更新点位
        startPoint = { x: touchArr[0][1].clientX, y: touchArr[0][1].clientY };
      }
      setTimeout(() => {
        isMove = false;
      }, 300);
    });
    window.addEventListener('pointermove', (e) => {
      e.preventDefault();
      if (isTouching) {
        isMove = true;
        if (touches.size < 2) {
          // 单指滑动-
          offset = {
            left: offset.left + (e.clientX - startPoint.x),
            top: offset.top + (e.clientY - startPoint.y),
          };
          changeStyle(cloneEl, [
            'transition: all 0s',
            `transform: translate(${offset.left + 'px'}, ${
              offset.top + 'px'
            }) scale(${scale})`,
            `transform-origin: ${origin}`,
          ]);
          // 更新点位
          startPoint = { x: e.clientX, y: e.clientY };
        } else {
          // 双指缩放
          touches.set(e.pointerId, e);
          const ratio = getDistance() / lastDistance;
          scale = ratio * lastScale;
          offset = getOffsetCorrection();
          changeStyle(cloneEl, [
            'transition: all 0s',
            `transform: translate(${offset.left + 'px'}, ${
              offset.top + 'px'
            }) scale(${scale})`,
            `transform-origin: ${origin}`,
          ]);
        }
      }
    });
    window.addEventListener('pointercancel', function (e) {
      touches.clear(); // 可能存在特定事件导致中断，真机操作时 pointerup 在某些边界情况下不会生效，所以需要清空
    });
  
    return props.children;
  };
  export default Preview;
  