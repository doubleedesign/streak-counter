function t(t){return t.toLocaleDateString("en-US")}function e(t){return parseInt(t.split("/")[1])}var r="streak";function n(e){var n=new Date,a={storage:e,startDate:t(n),lastLogin:t(n),count:0};return e.setItem(r,JSON.stringify(a)),a}function a(){var a=localStorage,o=function(t){var e=t.getItem(r);try{var n=JSON.parse(e);return""===n?null:n}catch(t){return console.error(t),null}}(a);if(o)try{!function(n){try{var a=JSON.parse(n.getItem(r)||""),o=e(t(new Date))-e(a.lastLogin);1===o?(a.count+=1,n.setItem(r,JSON.stringify(a))):1===o&&console.warn("Streak already incremented today")}catch(t){console.error("No streak to increment")}}(a)}catch(o){!function(a){try{var o=JSON.parse(a.getItem(r)||"");if(e(t(new Date))-e(o.lastLogin)>1){var i=n(a);a.setItem(r,JSON.stringify(i))}}catch(t){console.error("No streak to reset, maybe you want to initialise a new one?")}}(a)}else o=n(a);return o}export{a as getDailyStreak};
//# sourceMappingURL=index.module.js.map