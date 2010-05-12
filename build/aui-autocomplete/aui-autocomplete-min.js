AUI.add("aui-autocomplete",function(M){var y=M.Lang,V=y.isArray,J=y.isString,n=y.isNull,O=y.isFunction,x=M.ClassNameManager.getClassName,j="alert",h="content",p="helper",q="hidden",c="icon",v="item",k="list",R="loading",f="autocomplete",r="reset",t="results",a="selected",S="circle-triangle-b",i=j,D=R,C=x(f,a),s=x(p,q),H=x(f,k,v),o=x(p,r),B=x(f,t),U=x(f,t,h),Q=8,m=9,d=13,K=16,E=17,F=18,P=20,e=27,I=33,L=35,Y=36,l=38,X=40,W=39,T=37,g=44,w=44,G=229,Z={node:null,points:["tl","bl"]},u="boundingBox",b="contentBox";var N=M.Component.create({NAME:f,ATTRS:{alwaysShowContainer:{value:false},autoHighlight:{value:true},applyLocalFilter:{value:null},button:{value:true},dataSource:{value:null},dataSourceType:{value:null},delimChar:{value:null,setter:function(A){if(J(A)&&(A.length>0)){A=[A];}else{if(!V(A)){A=M.Attribute.INVALID_VALUE;}}return A;}},forceSelection:{value:false},input:{value:null},matchKey:{value:0},maxResultsDisplayed:{value:10},minQueryLength:{value:1},queryDelay:{value:0.2,getter:function(A){return A*1000;}},queryInterval:{value:0.5,getter:function(A){return A*1000;}},queryMatchCase:{value:false},queryMatchContains:{value:false},queryQuestionMark:{value:true},schema:{value:null},schemaType:{value:"",validator:J},suppressInputUpdate:{value:false},typeAhead:{value:false},typeAheadDelay:{value:0.2,getter:function(A){return A*1000;}},uniqueName:{value:null}},prototype:{initializer:function(z){var A=this;A._overlayAlign=M.mix({},Z);A._createDataSource();},renderUI:function(){var A=this;A._renderInput();A._renderOverlay();},bindUI:function(){var A=this;var z=A.button;var AA=A.inputNode;A.dataSource.on("request",M.bind(z.set,z,c,D));AA.on("blur",A._onTextboxBlur,A);AA.on("focus",A._onTextboxFocus,A);AA.on("keydown",A._onTextboxKeyDown,A);AA.on("keypress",A._onTextboxKeyPress,A);AA.on("keyup",A._onTextboxKeyUp,A);var AB=A.overlay.get(u);AB.on("click",A._onContainerClick,A);AB.on("mouseout",A._onContainerMouseout,A);AB.on("mouseover",A._onContainerMouseover,A);AB.on("scroll",A._onContainerScroll,A);A.publish("containerCollapse");A.publish("containerExpand");A.publish("containerPopulate");A.publish("dataError");A.publish("dataRequest");A.publish("dataReturn");A.publish("itemArrowFrom");A.publish("itemArrowTo");A.publish("itemMouseOut");A.publish("itemMouseOver");A.publish("itemSelect");A.publish("selectionEnforce");A.publish("textboxBlur");A.publish("textboxChange");A.publish("textboxFocus");A.publish("textboxKey");A.publish("typeAhead");A.publish("unmatchedItemSelect");A.overlay.after("visibleChange",A._realignContainer,A);},syncUI:function(){var A=this;A.inputNode.setAttribute("autocomplete","off");},doBeforeExpandContainer:function(){return true;},doBeforeLoadData:function(A){return true;},filterResults:function(AJ){var AP=this;var AA=AJ.callback;var AB=AJ.request;var z=AJ.response;if(AA&&AA.argument&&AA.argument.query){AB=AA.argument.query;}if(AB){var AO=AP.dataSource;var AL=z.results;var A=[];var AD=false;var AC=AP.get("matchKey");var AM=AP.get("queryMatchCase");var AH=AP.get("queryMatchContains");var AG=(AB=="*");var AI=AP.get("schema.resultFields");for(var AK=AL.length-1;AK>=0;AK--){var AF=AL[AK];var AN=null;if(J(AF)){AN=AF;}else{if(V(AF)){AN=AF[0];}else{if(AI){AN=AF[AC||AI[0]];}}}if(J(AN)){var AE=-1;if(AM){AE=AN.indexOf(decodeURIComponent(AB));}else{AE=AN.toLowerCase().indexOf(decodeURIComponent(AB).toLowerCase());}if((AG)||(!AH&&(AE===0))||(AH&&(AE>-1))){A.unshift(AF);}}}z.results=A;}return z;},formatResult:function(z,AA,A){return A||"";},generateRequest:function(A){return{request:A};},handleResponse:function(AA){var z=this;z._populateList(AA);var A=S;if(AA.error){A=i;}z.button.set(c,A);},sendQuery:function(z){var A=this;A.set("focused",null);var AA=z;if(A.get("delimChar")){z=A.inputNode.get("value")+z;}A._sendQuery(AA);},_clearInterval:function(){var A=this;if(A._queryIntervalId){clearInterval(A._queryIntervalId);A._queryIntervalId=null;}},_clearSelection:function(){var z=this;var AA=z.get("delimChar");var A={previous:"",query:z.inputNode.get("value")};if(AA){A=z._extractQuery(z.inputNode.get("value"));}z.fire("selectionEnforce",A.query);},_createDataSource:function(){var A=this;var AE=A.get("dataSource");var AC=AE;var AD=A.get("dataSourceType");if(!(AE instanceof M.DataSource.Local)){if(!AD){AD="Local";if(O(AC)){AD="Function";}else{if(J(AC)){AD="IO";}}}AE=new M.DataSource[AD]({source:AC});}AE.on("error",A.handleResponse,A);AE.after("response",A.handleResponse,A);AD=AE.name;if(AD=="dataSourceLocal"){A.set("applyLocalFilter",true);}A.set("dataSource",AE);A.set("dataSource",AD);A.dataSource=AE;var AB=A.get("schema");if(AB){if(AB.fn){A.dataSource.plug(AB);}else{var z=A.get("schemaType");var AA={array:M.Plugin.DataSourceArraySchema,json:M.Plugin.DataSourceJSONSchema,text:M.Plugin.DataSourceTextSchema,xml:M.Plugin.DataSourceXMLSchema};z=z.toLowerCase()||"array";A.dataSource.plug({fn:AA[z],cfg:{schema:AB}});}}A.set("schema",AB);},_enableIntervalDetection:function(){var A=this;var z=A.get("queryInterval");if(!A._queryIntervalId&&z){A._queryInterval=setInterval(M.bind(A._onInterval,A),z);}},_extractQuery:function(AC){var AG=this;var AE=AG.get("delimChar");var A=-1;var AA=AE.length-1;var AF,AD,AB;for(;AA>=0;AA--){AF=AC.lastIndexOf(AE[AA]);if(AF>A){A=AF;}}if(AE[AA]==" "){for(var z=AE.length-1;z>=0;z--){if(AC[A-1]==AE[z]){A--;break;}}}if(A>-1){AD=A+1;while(AC.charAt(AD)==" "){AD+=1;}AB=AC.substring(0,AD);AC=AC.substring(AD);}else{AB="";}return{previous:AB,query:AC};},_focus:function(){var A=this;setTimeout(function(){A.inputNode.focus();},0);},_isIgnoreKey:function(z){var A=this;if((z==m)||(z==d)||(z==K)||(z==E)||(z>=F&&z<=P)||(z==e)||(z>=I&&z<=L)||(z>=Y&&z<=X)||(z>=g&&z<=w)||(z==G)){return true;}return false;},_jumpSelection:function(){var A=this;if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}},_moveSelection:function(AL){var AI=this;if(AI.overlay.get("visible")){var AM=AI._elCurListItem;var z=-1;if(AM){z=Number(AM.getAttribute("data-listItemIndex"));}var AA=z-1;
if(AL==X){AA=z+1;}if(AA==-1){AA=AI._displayedItems-1;}if(AA>=AI._displayedItems){AA=0;}if(AA<-2){return;}if(AM){AI._toggleHighlight(AM,"from");AI.fire("itemArrowFrom",AM);}if(AA==-1){if(AI.get("delimChar")){AI.inputNode.set("value",AI._pastSelections+AI._currentQuery);}else{AI.inputNode.set("value",AI._currentQuery);}return;}if(AA==-2){AI._toggleContainer(false);return;}var AE=AI.resultList.get("childNodes").item(AA);var AC=AI.overlay.get(b);var AG=AC.getStyle("overflow");var AJ=AC.getStyle("overflowY");var AB=(AG=="auto")||(AG=="scroll")||(AJ=="auto")||(AJ=="scroll");if(AB&&(AA>-1)&&(AA<AI._displayedItems)){var A=-1;var AN=AE.get("offsetTop");var AD=AN+AE.get("offsetHeight");var AH=AC.get("offsetHeight");var AF=AC.get("scrollTop");var AK=AH+AF;if(AL==X){if(AD>AK){A=(AD-AH);}else{if(AD<AF){A=AN;}}}else{if(AN<AH){A=AN;}else{if(AN>AK){A=(AD-AH);}}}if(A>-1){AC.set("scrollTop",A);}}AI._toggleHighlight(AE,"to");AI.fire("itemArrowTo",AE);if(AI.get("typeAhead")){AI._updateValue(AE);}}},_onButtonMouseDown:function(z){var A=this;z.halt();A._focus();A._sendQuery(A.inputNode.get("value")+"*");},_onContainerClick:function(AA){var A=this;var AB=AA.target;var z=AB.get("nodeName").toLowerCase();AA.halt();while(AB&&(z!="table")){switch(z){case"body":return;case"li":A._toggleHighlight(AB,"to");A._selectItem(AB);return;default:break;}AB=AB.get("parentNode");if(AB){z.get("nodeName").toLowerCase();}}},_onContainerMouseout:function(AA){var A=this;var AB=AA.target;var z=AB.get("nodeName").toLowerCase();while(AB&&(z!="table")){switch(z){case"body":return;case"li":A._toggleHighlight(AB,"from");A.fire("itemMouseOut",AB);break;case"ul":A._toggleHighlight(A._elCurListItem,"to");break;case"div":if(AB.hasClass(B)){A._overContainer=false;return;}break;default:break;}AB=AB.get("parentNode");if(AB){z=AB.get("nodeName").toLowerCase();}}},_onContainerMouseover:function(AA){var A=this;var AB=AA.target;var z=AB.get("nodeName").toLowerCase();while(AB&&(z!="table")){switch(z){case"body":return;case"li":A._toggleHighlight(AB,"to");A.fire("itemMouseOut",AB);break;case"div":if(AB.hasClass(B)){A._overContainer=true;return;}break;default:break;}AB=AB.get("parentNode");if(AB){z=AB.get("nodeName").toLowerCase();}}},_onContainerScroll:function(z){var A=this;A._focus();},_onInterval:function(){var A=this;var AA=A.inputNode.get("value");var z=A._lastValue;if(AA!=z){A._lastValue=AA;A._sendQuery(AA);}},_onTextboxBlur:function(AB){var A=this;if(!A._overContainer||(A._keyCode==m)){if(!A._itemSelected){var AA=A._textMatchesOption();var z=A.overlay.get("visible");if(!z||(z&&n(AA))){if(A.get("forceSelection")){A._clearSelection();}else{A.fire("unmatchedItemSelect",A._currentQuery);}}else{if(A.get("forceSelection")){A._selectItem(AA);}}}A._clearInterval();A.blur();if(A._initInputValue!==A.inputNode.get("value")){A.fire("textboxChange");}A.fire("textboxBlur");A._toggleContainer(false);}else{A._focus();}},_onTextboxFocus:function(z){var A=this;if(!A.get("focused")){A.inputNode.setAttribute("autocomplete","off");A.focus();A._initInputValue=A.inputNode.get("value");A.fire("textboxFocus");}},_onTextboxKeyDown:function(z){var A=this;var AA=z.keyCode;if(A._typeAheadDelayId!=-1){clearTimeout(A._typeAheadDelayId);}switch(AA){case m:if(A._elCurListItem){if(A.get("delimChar")&&A._keyCode!=AA){if(A.overlay.get("visible")){z.halt();}}A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}break;case d:if(A._elCurListItem){if(A._keyCode!=AA){if(A.overlay.get("visible")){z.halt();}}A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}break;case e:A._toggleContainer(false);return;case l:if(A.overlay.get("visible")){z.halt();A._moveSelection(AA);}break;case W:A._jumpSelection();break;case X:if(A.overlay.get("visible")){z.halt();A._moveSelection(AA);}break;default:A._itemSelected=false;A._toggleHighlight(A._elCurListItem,"from");A.fire("textboxKey",AA);break;}if(AA==F){A._enableIntervalDetection();}A._keyCode=AA;},_onTextboxKeyPress:function(z){var A=this;var AA=z.keyCode;switch(AA){case m:if(A.overlay.get("visible")){if(A.get("delimChar")){z.halt();}if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}break;case 13:if(A.overlay.get("visible")){z.halt();if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}break;default:break;}if(AA==G){A._enableIntervalDetection();}},_onTextboxKeyUp:function(AA){var A=this;var z=A.inputNode;var AB=z.get("value");var AC=AA.keyCode;if(A._isIgnoreKey(AC)){return;}if(A._delayId!=-1){clearTimeout(A._delayId);}A._delayId=setTimeout(function(){A._sendQuery(AB);},A.get("queryDelay"));},_populateList:function(A){var AJ=this;if(AJ._typeAheadDelayId!=-1){clearTimeout(AJ._typeAheadDelayId);}var AE=A.request;var AC=A.response;var AM=A.callback;var AB=(AE=="*");if(AM&&AM.argument&&AM.argument.query){A.request=AE=AM.argument.query;}var AH=AJ.doBeforeLoadData(A);if(AH&&!A.error){AJ.fire("dataReturn",A);var AG=AJ.get("focused");if(AB||AG||AG===null){var AF=decodeURIComponent(AE);AJ._currentQuery=AF;AJ._itemSelected=false;var AA=A.response.results;var AL=Math.min(AA.length,AJ.get("maxResultsDisplayed"));var AD=AJ.get("schema.resultFields");var AK=AJ.get("matchKey");if(!AK&&AD){AK=AD[0];}else{AK=AK||0;}if(AL>0){var AI=AJ.resultList.get("childNodes");AI.each(function(AR,AQ,AP){if(AQ<AL){var AO=AA[AQ];var AN="";if(J(AO)){AN=AO;}else{if(V(AO)){AN=AO[0];}else{AN=AO[AK];}}AR._resultMatch=AN;AR._resultData=AO;AR.html(AJ.formatResult(AO,AF,AN));AR.removeClass(s);}else{AR.addClass(s);}});AJ._displayedItems=AL;AJ.fire("containerPopulate",AE,AA);if(AE!="*"&&AJ.get("autoHighlight")){var z=AJ.resultList.get("firstChild");AJ._toggleHighlight(z,"to");AJ.fire("itemArrowTo",z);AJ._typeAhead(z,AE);}else{AJ._toggleHighlight(AJ._elCurListItem,"from");}AH=AJ.doBeforeExpandContainer(AE,AA);AJ._toggleContainer(AH);}else{AJ._toggleContainer(false);}return;}}else{AJ.fire("dataError",AE);}},_realignContainer:function(z){var A=this;var AA=A._overlayAlign;if(z.newVal){A.overlay._uiSetAlign(AA.node,AA.points);
}},_renderInput:function(){var z=this;var AA=z.get(b);var AB=z.get("input");var AD={field:{labelText:false},icons:[{icon:"circle-triangle-b",id:"trigger",handler:{fn:z._onButtonMouseDown,context:z}}]};var AC=null;var A=null;if(AB){AB=M.one(AB);AD.field.node=AB;AC=AB.next();A=AB.get("parentNode");}var AE=new M.Combobox(AD).render(AA);if(A){var AF=AE.get("boundingBox");A.insertBefore(AF,AC);}z.inputNode=AE.get("node");z.button=AE.icons.item("trigger");z.set("uniqueName",M.stamp(z.inputNode));},_renderListElements:function(){var A=this;var AB=A.get("maxResultsDisplayed");var z=A.resultList;var AA=[];while(AB--){AA[AB]='<li class="'+s+" "+H+'" data-listItemIndex="'+AB+'"></li>';}z.html(AA.join(""));},_renderOverlay:function(){var A=this;var AB=A._overlayAlign;AB.node=A.inputNode;var AA=new M.OverlayBase({align:AB,bodyContent:"<ul></ul>",visible:false,width:A.inputNode.get("offsetWidth")});var z=AA.get(b);AA.get(u).addClass(B);z.addClass(U);AA.render(document.body);AA.addTarget(A);A.overlay=AA;A.resultList=z.one("ul");A.resultList.addClass(o);A._renderListElements();},_selectItem:function(z){var A=this;A._itemSelected=true;A._updateValue(z);A._pastSelections=A.inputNode.get("value");A._clearInterval();A.fire("itemSelect",z,z._resultData);A._toggleContainer(false);},_selectText:function(AC,AE,AA){var A=this;var z=M.Node.getDOMNode(AC);var AD=AC.get("value");if(z.setSelectionRange){z.setSelectionRange(AE,AA);}else{if(z.createTextRange){var AB=z.createTextRange();AB.moveStart("character",AE);AB.moveEnd("character",AA-AD.length);AB.select();}else{z.select();}}},_sendQuery:function(AD){var z=this;if(z.get("disabled")){z._toggleContainer(false);return;}var AB=z.get("delimChar");var AA=z.get("minQueryLength");if(AB){var A=z._extractQuery(AD);AD=A.query;z._pastSelections=A.previous;}if((AD&&(AD.length<AA))||(!AD&&AA>0)){if(z._delayId!=-1){clearTimeout(z._delayId);}z._toggleContainer(false);return;}AD=encodeURIComponent(AD);z._delayId=-1;if(z.get("applyLocalFilter")){z.dataSource.on("response",z.filterResults,z);}var AC=z.generateRequest(AD);z.fire("dataRequest",AD,AC);z.dataSource.sendRequest(AC);},_textMatchesOption:function(){var A=this;var z=null;var AD=A._displayedItems;var AE=A.resultList.get("childNodes");for(var AB=0;AB<AD.length;AB++){var AC=AE.item(AB);var AA=(""+AC._resultMatch).toLowerCase();if(AA==A._currentQuery.toLowerCase()){z=AC;break;}}return z;},_toggleContainer:function(z){var A=this;var AA=A.overlay;if(A.get("alwaysShowContainer")&&AA.get("visible")){return;}if(!z){A._toggleHighlight(A._elCurListItem,"from");A._displayedItems=0;A._currentQuery=null;}if(z){AA.show();A.fire("containerExpand");}else{AA.hide();A.fire("containerCollapse");}},_toggleHighlight:function(z,AA){var A=this;if(z){if(A._elCurListItem){A._elCurListItem.removeClass(C);A._elCurListItem=null;}if(AA=="to"){z.addClass(C);A._elCurListItem=z;}}},_typeAhead:function(z,AA){var A=this;if(!A.get("typeAhead")||A._keyCode==Q){return;}var AB=M.Node.getDOMNode(A.inputNode);if(AB.setSelectionRange||AB.createTextRange){A._typeAheadDelayId=setTimeout(function(){var AE=AB.value;var AF=AE.length;A._updateValue(z);var AC=AB.value.length;A._selectText(A.inputNode,AF,AC);var AD=AB.value.substr(AF,AC);A.fire("typeAhead",AA,AD);},A.get("typeAheadDelay"));}},_updateValue:function(AD){var z=this;if(!z.get("suppressInputUpdate")){var AC=z.inputNode;var A=AD._resultMatch;var AB=z.get("delimChar");AB=(AB&&AB[0])||AB;var AE="";if(AB){AE=z._pastSelections;AE+=A+AB;if(AB!=" "){AE+=" ";}}else{AE=A;}AC.set("value",AE);if(AC.get("type")=="textarea"){AC.set("scrollTop",AC.get("scrollHeight"));}var AA=AE.length;z._selectText(AC,AA,AA);z._elCurListItem=AD;}},_currentQuery:null,_delayId:-1,_displayedItems:0,_elCurListItem:null,_initInputValue:null,_itemSelected:false,_keyCode:null,_lastValue:null,_overContainer:false,_pastSelections:"",_typeAheadDelayId:-1}});M.AutoComplete=N;},"@VERSION@",{requires:["aui-base","aui-overlay-base","datasource","dataschema","aui-form-combobox"],skinnable:true});