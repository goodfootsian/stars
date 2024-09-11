// the stars
class STARtype {
    constructor(name = "unknown", HD = "-", BD = "BD-", h = 3, dm = 4, dsign = 1, d = 5, m = 6, Ptm = 0, SpT = "G2") {
        this.name = name;
        this.HD = HD;
        this.BD = BD;
        this.h = h;  // increases when moving left
        this.dm = dm;  // 10th of a minute
        this.dsign = dsign; // 1 is north, -1 is south
        this.d = d;    
        this.m = m;
        this.Ptm = Ptm;
        this.SpT = SpT;
    }
}
var stars = [];
//stars.push(new STARtype("Sirius", "48915", "BD-16 1591", 6, 407, -16, -35, -1.58, "A0"));
//stars.push(new STARtype("Rigel", "34085", "BD-08 1063", 5, 97, -8, -19, 0.34, "B8p"));
