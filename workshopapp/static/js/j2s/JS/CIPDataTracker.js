Clazz.declarePackage ("JS");
Clazz.load (["JS.CIPData", "java.util.Hashtable"], "JS.CIPDataTracker", ["JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htTracker = null;
if (!Clazz.isClassDefined ("JS.CIPDataTracker.CIPTracker")) {
JS.CIPDataTracker.$CIPDataTracker$CIPTracker$ ();
}
this.lastIndex = -1;
this.lastInfo = null;
Clazz.instantialize (this, arguments);
}, JS, "CIPDataTracker", JS.CIPData);
Clazz.prepareFields (c$, function () {
this.htTracker =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "isTracker", 
function () {
return true;
});
Clazz.overrideMethod (c$, "track", 
function (cip, a, b, sphere, finalScore, mode) {
if (a.rootSubstituent === b.rootSubstituent) return;
var t;
var a1;
var b1;
System.out.println (a + " " + b + " " + sphere);
if (finalScore > 0) {
a1 = b;
b1 = a;
} else {
a1 = a;
b1 = b;
}t = Clazz.innerTypeInstance (JS.CIPDataTracker.CIPTracker, this, null, cip.currentRule, a1, b1, sphere, Math.abs (finalScore), mode);
this.htTracker.put (JS.CIPDataTracker.getTrackerKey (cip.root, a1, b1), t);
switch (mode) {
case 4:
case 1:
break;
case 2:
case 3:
}
}, "JS.CIPChirality,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~N,~N,~N");
Clazz.overrideMethod (c$, "getRootTrackerResult", 
function (root) {
var s = "";
for (var i = 0; i < 3; i++) {
s += "\t" + root.atoms[i] + "\t--------------\n";
var t = this.htTracker.get (JS.CIPDataTracker.getTrackerKey (root, root.atoms[i], root.atoms[i + 1]));
if (t == null) {
} else {
s += t.getTrackerLine (t.a, t.bsa);
s += "\t   " + JV.JC.getCIPRuleName (t.rule) + "\n";
s += t.getTrackerLine (t.b, t.bsb);
}}
s += "\t" + root.atoms[3] + "\t--------------\n";
System.out.println (s);
this.setCIPInfo (s, root.atom.getIndex (), root.atom.getAtomName ());
return s;
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "setCIPInfo", 
 function (s, index, name) {
var modelInfo = this.getModelAuxiliaryInfoForAtom (index);
if (modelInfo != null) {
var cipInfo = modelInfo.get ("CIPInfo");
if (cipInfo == null) modelInfo.put ("CIPInfo", cipInfo =  new java.util.Hashtable ());
cipInfo.put (name, s);
}}, "~S,~N,~S");
Clazz.defineMethod (c$, "getModelAuxiliaryInfoForAtom", 
 function (index) {
return (index == this.lastIndex ? this.lastInfo : (this.lastInfo = this.vwr.ms.getModelAuxiliaryInfo (this.vwr.ms.at[this.lastIndex = index].getModelIndex ())));
}, "~N");
c$.getTrackerKey = Clazz.defineMethod (c$, "getTrackerKey", 
 function (root, a, b) {
return (b.rootSubstituent == null ? "" : root.atom.getAtomName () + "." + a.rootSubstituent.atom.getAtomName () + "-" + b.rootSubstituent.atom.getAtomName ());
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
c$.$CIPDataTracker$CIPTracker$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.a = null;
this.b = null;
this.sphere = 0;
this.score = 0;
this.mode = 0;
this.rule = 0;
this.bsa = null;
this.bsb = null;
Clazz.instantialize (this, arguments);
}, JS.CIPDataTracker, "CIPTracker");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f) {
this.rule = a;
this.a = b;
this.b = c;
this.sphere = d;
this.score = e;
this.mode = f;
this.bsa = b.listRS == null ? null : b.listRS[0];
this.bsb = c.listRS == null ? null : c.listRS[0];
}, "~N,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~N,~N,~N");
Clazz.defineMethod (c$, "getTrackerLine", 
function (a, b) {
return "\t\t" + a.myPath + (this.mode != 3 ? "" : a.isTerminal ? "-o" : "-" + a.atoms[0].atom.getAtomName ()) + (this.rule == 8 || b == null ? "" : "\t" + this.getLikeUnlike (b, a.listRS)) + "\n";
}, "JS.CIPChirality.CIPAtom,JU.BS");
Clazz.defineMethod (c$, "getLikeUnlike", 
 function (a, b) {
if (this.rule > 8) return "";
var c = Math.max (b[1].length (), b[2].length ());
var d = (this.rule == 8 ? "" : a === b[1] ? "(R)" : "(S)");
var e = (this.rule == 8 ? "R" : "l");
var f = (this.rule == 8 ? "S" : "u");
for (var g = 0; g < c; g++) d += (a.get (g) ? e : f);

return d;
}, "JU.BS,~A");
c$ = Clazz.p0p ();
};
});
