var animation=function(){var o,i,e,t,n,s,a,r,l,c,u,v;function m(){o&&i||(o=$("#canvas")[0],i=o.getContext("2d")),o.width=o.width;var e,t=v.width-300,n=0;300<a.x&&a.x<=t?(e=-1*(a.x-300),n=a.x-300):a.x>t?(e=-1*(t-300),n=v.width-600):e=0,i.translate(e,0),i.save(),a.moveXStatus==moveTypes.left&&(i.translate(2*a.x+a.width,0),i.scale(-1,1)),i.drawImage(images[1],a.x,a.y),i.restore(),i.fillStyle=v.color,i.fillRect(v.x,v.y,v.width,v.height),function(e){for(var t,n=0;n<blocks.length;n++)(t=blocks[n]).x<e+600&&t.x+t.width>e&&(t.url?i.drawImage(images[0],t.x,t.y):(i.fillStyle=t.color,i.fillRect(t.x,t.y,t.width,t.height)))}(n)}function h(){a.moveXStatus=r,a.moveXStatus=r,l!=moveTypes.none&&a.moveYStatus==moveTypes.none&&(a.moveYStatus=l,a.airTime=0,l=moveTypes.none),a.update(),r==moveTypes.none&&l==moveTypes.none&&a.moveYStatus==moveTypes.none||m(),a.x+a.width>=v.width-10&&(s=!0,d()),function(){var e=t;n||(n=$("#clock")[0]);t=e+=1e3/30,n.innerText=(e/1e3).toFixed()}(),function(){c&&u||(c=$("#x-coord")[0],u=$("#y-coord")[0]);c.innerText=a.x,u.innerText=a.y.toFixed(2)}(),s||(e=setTimeout(h,1e3/30))}function d(){console.log("win"),clearTimeout(e),page.changeLevel(t)}return{beginClock:function(){t=0,r=moveTypes.none,l=moveTypes.none,s=!1,a=new Sprite(10,200,50,78),m(),setTimeout(h,1e3/30)},draw:m,ground:function(){return v},move:function(e,t){switch(e){case"x":r=t;break;case"y":l=t}},setGround:function(e){v=e},win:d}}(),physics={blocks:void 0,adjustMove:function(e,t,n,o,i,s,a,r){var l,c,u={},v=e+i,m=t+s,h=i,d=s,p=null,f=animation.ground().width;return l=this.testHit(e,m,n,o,{startY:t,moveDir:a}),c=this.testHit(v,t,n,o),a==moveTypes.right?f-n<v?h=f-n-e:c&&(h=c.x-(e+n)):a==moveTypes.left&&(v<0?h=0-e:c&&(h=c.x+c.width-e)),r==moveTypes.jumping&&l&&(d=l.y+l.height-t,p=moveTypes.falling),0<s&&(280-o<m?(d=280-o-t,p=moveTypes.none):l&&(d=l.y-(t+o),p=moveTypes.none)),u.x=h,u.y=d,u.moveYStatus=p,u},testHit:function(e,t,n,o,i){for(var s,a,r,l,c,u,v,m=0;m<blocks.length;m++){if(a=e+n>(s=blocks[m]).x,r=e<s.x+s.width,l=t+o>s.y,c=t<s.y+s.height,a&&r&&l&&c)return s;if(null!=i&&(i.moveDir==moveTypes.falling&&(u=i.startY<=s.y+5,v=t+o+5>=s.y),a&&r&&u&&v))return s}return null},testFall:function(e,t){var n=!1;return this.testHit(e,t+1)||(n=!0),n},jump:function(e){var t={},n=2*e-4,o=moveTypes.jumping,i=e;return-.5<n?(o=moveTypes.falling,i=0):n*=10,t.y=n,t.status=o,t.time=i,t},fall:function(e){var t={},n=10*Math.pow(e,2),o=moveTypes.falling,i=e;return t.y=n,t.status=o,t.time=i,t},setBlocks:function(e){blocks=e}},moveTypes={none:"none",right:"right",left:"left",jumping:"jumping",falling:"falling"};function Sprite(e,t,n,o){this.x=e,this.y=t,this.width=n,this.height=o,this.color="rgba(0,0,0,1)",this.airTime=0,this.moveXStatus=moveTypes.none,this.moveYStatus=moveTypes.none,this.move=10}Sprite.prototype.update=function(){var e=0,t=0,n=null;switch(this.moveXStatus){case moveTypes.right:e=this.move;break;case moveTypes.left:e=0-this.move}switch(this.moveYStatus){case moveTypes.jumping:n=physics.jump(this.airTime);break;case moveTypes.falling:n=physics.fall(this.airTime);break;default:physics.testFall(this.x,this.y)&&(this.moveYStatus=moveTypes.falling)}n&&(this.airTime=n.time+1/3,this.moveYStatus=n.status,t=n.y);var o=physics.adjustMove(this.x,this.y,this.width,this.height,e,t,this.moveXStatus,this.moveYStatus);o.moveYStatus&&(this.moveYStatus=o.moveYStatus,this.airTime=0),this.x=this.x+o.x,this.y=this.y+o.y};var page=function(){var o,i,s,a,n=["load-screen","game-screen","level-complete"];function r(){c()}function l(e){for(var t=0;t<n.length;t++)$("#"+n[t]).addClass("hidden");$("#"+e).toggleClass("hidden")}function c(){var t="level"+ ++a+".json",n=new XMLHttpRequest;n.addEventListener("load",function(){console.log(t+" load complete.");var e=n.response;animation.setGround(e.ground),physics.setBlocks(e.blocks),l("game-screen"),$("#game-display").css("background-image",e.background),animation.beginClock()}),n.responseType="json",n.open("GET",t),n.send()}function u(){try{animation.move("x",moveTypes.right)}catch(e){console.log(e)}}function v(){try{animation.move("x",moveTypes.left)}catch(e){console.log(e)}}function m(){try{animation.move("y",moveTypes.jumping)}catch(e){console.log(e)}}function h(){try{animation.move("x",moveTypes.none)}catch(e){console.log(e)}}return{changeLevel:function(e){var t=$("#nextlevel")[0],n=$("#time")[0];t.removeEventListener("click",r),n.innerText="Finish time: "+(e/1e3).toFixed()+" seconds",2==a?(t.disabled=!0,t.style.display="none",n.innerHTML+="<br/>Game over! You win!"):t.addEventListener("click",r),l("level-complete")},levelCount:a,startGame:function(e){o=$("#left")[0],i=$("#right"),s=$("#jump"),"touch"==e?(n="object"==typeof TouchEvent?(t="touchstart","touchend"):(t="mousedown","mouseup"),o.addEventListener(t,function(e){e.preventDefault(),v()}),o.addEventListener(n,function(e){e.preventDefault(),h()}),i.addEventListener(t,function(e){e.preventDefault(),u()}),i.addEventListener(n,function(e){e.preventDefault(),h()}),s.addEventListener(t,function(e){e.preventDefault(),m()}),$("#keys").addClass("hidden")):(addEventListener("keydown",function(e){e.preventDefault();var t=e.keyCode;switch(t){case 37:v();break;case 39:u();break;case 32:case 38:m()}}),addEventListener("keyup",function(e){e.preventDefault();var t=e.keyCode;switch(t){case 37:case 39:h()}}),$("#buttons").addClass("hidden")),a=0,c();var t,n},toggleDisplay:l}}(),images=[];window.onload=function(){var n=["/images/block.png","/images/vK_50x78.png"];console.log("start game load"),$.when($.Deferred(function(e){var t=new Image;t.onload=function(){images[0]=t,e.resolve()},t.src=n[0]}),$.Deferred(function(e){var t=new Image;t.onload=function(){images[1]=t,e.resolve()},t.src=n[1]}),$.Deferred(function(e){$(e.resolve)})).done(function(){var e=$("#message")[0];e.innerHTML="Loading complete!<br/><br/>";e.setAttribute("touchstart",function(){}),console.log(typeof e.ontouchstart),$(e).append("<input id='start' type='button' value='Start game' />"),$("#start").click(function(e){var t;t=e.target,page.startGame(t.id)})})};