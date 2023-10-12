let code = `var Destroyed = 1 << 0;
var RealDestroyed = 1 << 1;
var ToDestroy = 1 << 2;
var DontSave = 1 << 3;
var EditorOnly = 1 << 4;
var Dirty = 1 << 5;
var DontDestroy = 1 << 6;
var Destroying = 1 << 7;
var Deactivating = 1 << 8;
var LockedInEditor = 1 << 9;
var HideInHierarchy = 1 << 10;
var IsOnEnableCalled = 1 << 11;
var IsEditorOnEnableCalled = 1 << 12;
var IsPreloadStarted = 1 << 13;
var IsOnLoadCalled = 1 << 14;
var IsOnLoadStarted = 1 << 15;
var IsStartCalled = 1 << 16;
var IsRotationLocked = 1 << 17;
var IsScaleLocked = 1 << 18;
var IsAnchorLocked = 1 << 19;
var IsSizeLocked = 1 << 20;
var IsPositionLocked = 1 << 21;`
eval(code);

let tables = {};
let codes = code.replace(/var /g, "").replace(/;/g, "").split("\n").map(info=>{
    let xx = info.split(" = ");
    tables[eval(xx[1])] = xx[0];
});

let MASK = Object.keys(tables);
var PersistentMask = ~(ToDestroy | Dirty | Destroying | DontDestroy | Deactivating |
    IsPreloadStarted | IsOnLoadStarted | IsOnLoadCalled | IsStartCalled |
    IsOnEnableCalled | IsEditorOnEnableCalled |
    IsRotationLocked | IsScaleLocked | IsAnchorLocked | IsSizeLocked | IsPositionLocked)

tables[-4192741] = 'PersistentMask';

export default function parse(n){
    if(n<0){
        return 'PersistentMask';
    }

    let ret = [];
    MASK.forEach(x=>{
        if(n & parseInt(x)){
            ret.push(tables[x])
        }
    });
    return ret.join(', ');
}
