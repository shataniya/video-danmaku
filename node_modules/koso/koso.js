/**
 * The goal is to build a tool library like jquery
 */
function $(selector,context){
    return new $.fn.init(selector,context)
}

$.fn = $.prototype
/**
 * @function init    Initialize dom
 * @params selector Dom element selector
 * @params context  The default is document
 */
$.prototype.init = function(selector,context){
    this.selector = selector
    this.context = context || document
    var doms = null
    if(Object.prototype.toString.call(selector) === "[object HTMLLIElement]"){
        doms = [selector]
    }else{
        doms = this.context.querySelectorAll(selector)
    }
    this.doms = doms
    this.length = doms.length
    for(let i=0,len=this.length;i<len;i++){
        this[i] = doms[i]
    }
    return this
}

$.prototype.init.prototype = $.fn


/**
 * @function html
 * @params val  innerHTML
 */
$.prototype.html = function(val){
    if(val){
        for(let i=0,len=this.length;i<len;i++){
            this[i].innerHTML = val
        }
    }else{
        return this[0].innerHTML
    }
}

/**
 * @function text
 * @params val innerText
 */
$.prototype.text = function(val){
    if(val){
        for(let i=0,len=this.length;i<len;i++){
            this[i].innerText = val
        }
    }else{
        return this[0].innerText
    }
}

/**
 * @function addClass
 * @params cn className
 */
$.prototype.addClass = function(cn){
    for(let i=0,len=this.length;i<len;i++){
        this[i].classList.add(cn)
    }
    return this
}

/**
 * @function removeClass
 * @params cn className
 */
$.prototype.removeClass = function(cn){
    for(let i=0,len=this.length;i<len;i++){
        this[i].classList.remove(cn)
    }
    return this
}

/**
 * @function toggleClass
 * Recommended to use in the id selector or the only dom
 * @params cn className
 */
$.prototype.toggleClass = function(cn){
    if(this.hasClass(cn)){
        this.removeClass(cn)
    }else{
        this.addClass(cn)
    }
    return this
}

/**
 * @function hasClass
 * Recommended to use in the id selector or the only dom
 * @params cn className
 */
$.prototype.hasClass = function(cn){
    var reg = new RegExp("\\b"+cn+"\\b","g")
    for(let i=0,len=this.length;i<len;i++){
        if(reg.test(this[i].className)){
            return true
        }
    }
    return false
}

/**
 * @function css
 * @params styleObject
 * or
 * @params name Specify style attribute name
 * @params value
 */
$.prototype.css = function(){
    var args = Array.from(arguments)
    if(args.length === 1){
        var name = args.pop()
        var styleObject = null
        if(typeof name === "object"){
            styleObject = name
            for(let o in styleObject){
                this.setcss(o,styleObject[o])
            }
            return this
        }else{
            return this.getcss(name)
        }
    }else if(args.length === 2){
        this.setcss.apply(this,args)
    }else{
        // 
        var oargs = args.splice(0,2)
        this.css.apply(this,oargs)
        return this
    }
}

/**
 * @function getcss
 * @params name Specify style attribute name
 */
$.prototype.getcss = function(name){
    return getComputedStyle(this[0],name) || this[0].style[name]
}

/**
 * @function setcss
 * @params name Specify style attribute name
 * @params val
 */
$.prototype.setcss = function(name,val){
    for(let i=0,len=this.length;i<len;i++){
        this[i].style[name] = val
    }
    return this
}

/**
 * @function next
 * @dsc return nextElementSibling
 */
$.prototype.next = function(){
    this.clearextra()
    this[0] = this[0].nextElementSibling
    return this
}

/**
 * @function nextNode
 * @dsc return nextSibling
 */
$.prototype.nextNode = function(){
    this.clearextra()
    this[0] = this[0].nextSibling
    return this
}

/**
 * @function nextAll
 * @dsc 
 */
$.prototype.nextAll = function(){
    var doms = []
    var current = this[0]
    while(current.nextElementSibling){
        doms.push(current.nextElementSibling)
        current = current.nextElementSibling
    }
    this.clearextra()
    this.increase(doms)
    return this
}

/**
 * @function prev
 * @dsc rteurn previousElementSibling
 */
$.prototype.prev = function(){
    this.clearextra()
    this[0] = this[0].previousElementSibling
    return this
}

/**
 * @function prevNode
 * @dsc return previousSibling
 */
$.prototype.prevNode = function(){
    this.clearextra()
    this[0] = this[0].previousSibling
    return this
}

/**
 * @function prevAll
 * @dsc
 */
$.prototype.prevAll = function(){
    var doms = []
    var current = this[0]
    while(current.previousElementSibling){
        doms.unshift(current.previousElementSibling)
        current = current.previousElementSibling
    }
    this.clearextra()
    this.increase(doms)
    return this
}

/**
 * @function parent
 * @dsc return parent element
 */
$.prototype.parent = function(){
    this.clearextra()
    this[0] = this[0].parentElement
    return this
}

/**
 * @function parentNode
 * @dsc return parent Node
 */
$.prototype.parentNode = function(){
    this.clearextra()
    this[0] = this[0].parentNode
    return this
}

/**
 * @function children
 * @dsc return children element
 */
$.prototype.children = function(){
    this.clearextra()
    this.increase(this[0].children)
    return this
}

/**
 * @function childNodes
 * @dsc return childNodes
 */
$.prototype.childNodes = function(){
    this.clearextra()
    this.increase(this[0].childNodes)
    return this
}

/**
 * @function first
 * @dsc return firstElementChild
 */
$.prototype.first = function(){
    this.clearextra()
    this[0] = this[0].firstElementChild
    return this
}

/**
 * @function firstNode
 * @dsc return firstNode
 */
$.prototype.firstNode = function(){
    this.clearextra()
    this[0] = this[0].firstChild
    return this
}

/**
 * @function last
 * @dsc return last
 */
$.prototype.last = function(){
    this.clearextra()
    this[0] = this[0].lastElementChild
    return this
}

/**
 * @function lastNode
 * @dsc return last
 */
$.prototype.lastNode = function(){
    this.clearextra()
    this[0] = this[0].lastChild
    return this
}

/**
 * @function appendTo
 * @dsc 
 * @params target parent element
 */
$.prototype.appendTo = function(target){
    for(let i=0,len=this.length;i<len;i++){
        target.append(this[i])
    }
    return this
}

/**
 * @function append
 * @dsc
 * @params dom
 */
$.prototype.append = function(dom){
    for(let i=0,len=this.length;i<len;i++){
        this[i].append(dom)
    }
    return this
}

// document.body.append

/**
 * @function val
 * @dsc Return the value of the input tag
 */
$.prototype.val = function(){
    return this[0].value
}

/**
 * @function dom
 * @dsc Return the specified dom 
 */
$.prototype.dom = function(){
    if(this.length === 1){
        return this[0]
    }
    return this.doms
}

/**
 * @function clearextra Clear extra dom
 */
$.prototype.clearextra = function(){
    if(this.length > 1){
        for(let i=1,len=this.length;i<len;i++){
            delete this[i]
        }
        this.length = 1
    }
    return this
}

/**
 * @function increase When the children() function is called, it will change the dom pointed to
 */
$.prototype.increase = function(doms){
    this.doms = doms
    this.length = doms.length
    for(let i=0,len=doms.length;i<len;i++){
        this[i] = doms[i]
    }
    return this
}


/**
 * @dsc The following functions are about the properties of the dom element
 */

/**
 * @function attr
 * @dsc Handling the attributes of the dom element
 * @parmas name Attribute name
 * @parmas val
 */
$.prototype.attr = function(name,val){
    if(val){
        this.setAttr(name,val)
        return this
    }
    if(typeof name === "object"){
        var attrObject = name
        for(let o in attrObject){
            this.setAttr(o,attrObject[o])
        }
        return this
    }
    return this.getAttr(name)
}

/**
 * @function getAttr
 * @dsc Get the attributes of the dom element
 * @parmas name Attribute name
 */
$.prototype.getAttr = function(name){
    if(this.length === 1){
        return this[0].getAttribute(name)
    }
    return null
}

/**
 * @function getAttrNames
 * @dsc Get all attribute names of the dom element
 */
$.prototype.getAttrNames = function(){
    if(this.length === 1){
        return this[0].getAttributeNames()
    }
    return null
}

/**
 * @function dataAttr
 * @dsc Get the attribute at the beginning of data-
 * @params name
 */
$.prototype.dataAttr = function(name){
    if(this.length === 1){
        return this[0].dataset[name]
    }
    return null
}

/**
 * @function setAttr
 * @dsc 
 * @params name
 * @params val
 */
$.prototype.setAttr = function(name,val){
    for(let i=0,len=this.length;i<len;i++){
        this[i].setAttribute(name,val)
    }
    return this
}



/**
 * @function addEvent
 * @dsc Add a listen event for the specified dom element
 * @params type event type
 * @params fn
 */
$.prototype.addEvent = function(type,fn){
    if(this.length === 1){
        $.addEvent(this[0],type,fn)
    }else{
        var parent = this[0].parentElement
        $.addEvent(parent,type,function(event){
            var event = event || window.event
            if(event.target === this[0]){
                fn.call(this)
            }
        })
    }
}



/**
 * @dsc The following are the attributes or functions that the $ class has.
 */

/**
 * @function extend
 * @dsc Add a function to $.prototype
 * @params name function name
 * @params fn
 */
$.extend = function(name,fn){
    this.prototype[name] = fn
    return this
}

/**
 * @Object ajax
 * @dsc Handling and sending ajax requests
 */
$.ajax = (function(){
    var xhl = new XMLHttpRequest()
    return {
        get:function(path){
            return new Promise(function(resolve,reject){
                xhl.open("GET",path,true)
                xhl.send(null)
                xhl.onreadystatechange = function(){
                    if(xhl.readyState === 4){
                        try{
                            resolve(JSON.parse(xhl.response))
                        }catch(err){
                            resolve(xhl.response)
                        }
                    }
                }
            })
        },
        post:function(path,data){
            return new Promise(function(resolve,reject){
                xhl.open('POST',path,true)
                xhl.send(data)
                xhl.onreadystatechange = function(){
                    if(xhl.readyState === 4){
                        try{
                            resolve(JSON.parse(xhl.response))
                        }catch(err){
                            resolve(xhl.response)
                        }
                    }
                }
            })
        }
    }
})();

/**
 * @function get
 * @dsc ajax get request
 * @function post
 * @dsc ajax post request
 */
$.get = $.ajax.get
$.post = $.ajax.post


/**
 * @function addEvent
 * @dsc Add a listen event for the specified dom element
 * @params dom
 * @params type event type
 * @params fn
 */
$.addEvent = function(dom,type,fn){
    if(document.addEventListener){
        dom.addEventListener(type,fn)
        return
    }
    if(document.addEvent){
        dom.addEvent("on"+type,fn)
        return
    }
    dom["on"+type] = fn
}