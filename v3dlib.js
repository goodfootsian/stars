        // v3d lib
        class RAtype {
            constructor(h = 3, dm = 4) {
                this.h = h;  // [0..23] increases when moving left / east
                this.dm = dm;  // 10th of a minute
            }
        }
        class DEtype {
            constructor(d = 3, m = 4) {
                this.d = d;    // [-90..90] positive is north, negative is south
                this.m = m;
            }
        }
        class SCREENtype {
            constructor(cwidth, cheight, magnification) {
                this.cwidth = cwidth;
                this.cheight = cheight;
                this.magnification = magnification;
                this.na = 0;
                this.p0x = 0;
                this.p0y = 0;
            }
            V3DtoScreen(n) {
                let s2 = this.na.to2D(this.p0x, this.p0y, n);
                return this.twoDtoScreen(s2);
                //return new V3Dtype(this.cwidth / 2 + s2.x * this.magnification, this.cheight / 2 + s2.y * this.magnification, 0);
            }
            twoDtoScreen(s2) {
                return new V3Dtype(this.cwidth / 2 + s2.x * this.magnification, this.cheight / 2 + s2.y * this.magnification, 0);
            }
            Screento2D(s) {
                return new V3Dtype((s.x - this.cwidth / 2) / this.magnification, (s.y - this.cheight / 2) / this.magnification, 0);
            }
            ScreentoV3D(s) {
                let t = this.Screento2D(s);
                return this.twoDtoV3D(t.x, t.y);
            }
            twoDtoV3D(x, y) {
                let v = this.na.n.clone();
                //console.log(v.toString("v"));
                let p0xn = this.p0x.n.clone();
                let p0yn = this.p0y.n.clone();
                v.add(p0xn.mul(x));
                v.add(p0yn.mul(-y));
                return v.normalize();
            }
            toString(name) {
                let s = name;
                if (name.length == 0) {
                    name = "SCREEN";
                }
                s = s + "(";
                s = s + this.na.toString("na") + this.p0x.toString("p0x") + this.p0y.toString("p0y");
                return s;
                s = s + ")";
            }
        }

        class RADEtype {
            constructor(h = 0, dm = 0, dsign = 1, d = 0, m = 0) {
                this.h = h;  // increases when moving left
                this.dm = dm;  // 10th of a minute
                this.dsign = dsign;
                this.d = d;    // positive is north, negative is south
                this.m = m;
            }
            clone(a) {
                return new RADEtype(this.h, this.dm, this.dsign, this.d, this.m);
            }
            toString(name = 'RADE') {
                let s = name + '(RA=' + this.h.toFixed(2) + ', dm=' + this.dm.toFixed(2) + ', DE=' + this.d.toFixed(2) + ', m=' + this.m.toFixed(2) + ')';
                return s;
            }
            toV3D() {
                let a = new V3Dtype(0, 0,);
                let ra = (this.h + this.dm / 600) / 24 * 2 * Math.PI;
                let de = (this.d) / 360 * 2 * Math.PI;
                let de_mdec = (this.m / 60) / 360 * 2 * Math.PI;
                de += de_mdec;
                if (this.dsign < 0) de = -de;
                let r = Math.cos(de);
                a.z = Math.sin(de);
                a.x = r * Math.cos(ra);
                a.y = r * Math.sin(ra);
                return a;
            }
        }
        class V3Dtype {
            constructor(x = 0, y = 0, z = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            toRADE() {
                let rade = new RADEtype();
                // DE
                let zplane = new NAtype(new V3Dtype(0, 0, 1), new V3Dtype(0, 0, 0));
                let d = zplane.distance(this);
                if (d < -1) {
                    rade.d = 90;
                } else if (d > 1) {
                    rade.d = -90;
                } else {
                    rade.d = -Math.asin(d) / Math.PI * 180;
                }
                rade.dsign = 1;
                if (rade.d < 0) {
                    rade.dsign = -1;
                    rade.d = Math.abs(rade.d);
                }
                let dtrunc = Math.trunc(rade.d);
                let dfrac = rade.d - dtrunc;
                rade.m = dfrac * 60;
                rade.d = dtrunc;
                //console.log(rade.d.toFixed(2) + " deg, " + rade.m.toFixed(2) + " minutes");
                // RA
                let a = 0;
                if (this.x > 0) {
                    a = Math.atan(this.y / this.x) / Math.PI * 180;
                } else if (this.x < 0 && this.y >= 0) {
                    a = Math.atan(this.y / this.x) / Math.PI * 180 + 180;
                } else if (this.x < 0 && this.y < 0) {
                    a = Math.atan(this.y / this.x) / Math.PI * 180 - 180;
                } else if (this.x == 0 && this.y > 0) {
                    a = 90;
                } else if (this.x == 0 && this.y < 0) {
                    a = -90;
                }
                if (a < 0) a += 360;
                rade.h = a / 15;
                rade.dm = rade.h;
                rade.h = Math.trunc(rade.h);
                rade.dm -= rade.h;
                rade.dm *= 600;
                return rade;
            }
            mul(f) {
                this.x *= f;
                this.y *= f;
                this.z *= f;
                return this;
            }
            copy(a) {
                this.x = a.x;
                this.y = a.y;
                this.z = a.z;
            }
            clone(a) {
                return new V3Dtype(this.x, this.y, this.z);
            }
            xproduct_n(b) {
                let result = new V3Dtype(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
                return result.normalize();
            }
            perpendicular() {
                let result = new V3Dtype();
                if (this.x == 0 && this.y == 0) {
                    result.x = -this.z;
                    result.y = this.y;
                    result.z = this.x;
                } else {
                    result.x = -this.y;
                    result.y = this.x;
                    result.z = this.z;
                }
                return result;
            }
            normalize() {
                let a = this.abs(this);
                this.x /= a;
                this.y /= a;
                this.z /= a;
                return this;
            }
            abs() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }
            sproduct(a) {
                return this.x * a.x + this.y * a.y + this.z * a.z;
            }
            subtract(a) {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
                return this;
            }
            distance(a) {
                return new V3Dtype(this.x - a.x, this.y - a.y, this.z - a.z).abs();
            }
            add(a) {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            }
            angle(v) {
                // angle between this and v
                return Math.acos(this.sproduct(v) / this.abs() / v.abs());
            }
            toString(name = 'V3D') {
                let s = name + '(' + this.x.toFixed(2) + ', ' + this.y.toFixed(2) + ', ' + this.z.toFixed(2) + ')';
                return s;

            }
            toRGB() {
                let s = '#' + Math.trunc(this.x).toString(16).padStart(2, '0') + Math.trunc(this.y).toString(16).padStart(2, '0') + Math.trunc(this.z).toString(16).padStart(2, '0');
                return s;
            }
            hsbToRgb() {
                // H: red - yellow - green - cyan - blue, purple
                // The range of the input parameters is H: [0, 360], S: [0, 100], B: [0, 100]
                // range of all output values is[0, 255].
                let h = this.x;
                let s = this.y;
                let b = this.z;
                s /= 100;
                b /= 100;
                const k = (n) => (n + h / 60) % 6;
                const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
                return new V3Dtype(255 * f(5), 255 * f(3), 255 * f(1));
            }
            rgbToHsb() {
                // The range of all input parameters is [0, 255]
                // range of the resulting values is H: [0, 360], S: [0, 100], B: [0, 100].
                let r = this.x;
                let g = this.y;
                let b = this.z;
                r /= 255;
                g /= 255;
                b /= 255;
                const v = Math.max(r, g, b),
                    n = v - Math.min(r, g, b);
                const h =
                    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
                return new V3Dtype(60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100);
            }
        }
        {
            console.log(new V3Dtype(90, 100, 100).hsbToRgb().toString());
            console.log(new V3Dtype(0, 255, 255).rgbToHsb().toString());
        }
        class NAtype {
            // Hesse normal form. Can be a plane or a line
            // plane: n (x-a) = 0
            // line: x(l) = l*n + a
            constructor(n, a) {
                this.n = n;   // nota: |n| = 1
                this.a = a;   // a point in the plane / line
                this.l = 0;   // l = lambda used to indicate whether a line intersects a plane in the direction of the normal vector of the line
                this.error = false;
            }
            toString(name = 'NAtype') {
                let s = name + '[n=' + this.n.toString() + ', ' + this.a.toString() + ']';
                return s;

            }
            distance(q) {
                // plane: distance to point
                // with sign: positive if the point is in the direction of the normal vector n
                let delta = this.a.clone();
                delta.subtract(q);
                return delta.sproduct(this.n);
            }
            x(l) {
                // line: a point on the line where distance between a and x is l
                let x = this.n.clone();
                x.mul(l);
                x.add(this.a);
                return x;
            }
            intersection_point(line) {
                let cos_g = this.n.sproduct(line.n);
                //let a = this.a.clone();
                //a.subtract(line.a);
                //this.l = this.n.sproduct(a) / cos_g;
                this.l = 1 / cos_g;
                return line.x(this.l);
            }
            to2D(p0x, p0y, n) {
                let its = this.intersection_point(new NAtype(n, new V3Dtype(0, 0, 0)));
                let x = -p0x.distance(its);
                let y = p0y.distance(its);
                // DEBUG begin
                //console.log("x=" + x.toFixed(2));
                // DEBUG end
                this.error = false;
                if (this.l < 0) {
                    // the object is in our back
                    this.error = true;
                }
                if (Math.abs(this.l) > 10000) {
                    // the object is too far off the center of the screen
                    this.error = true;
                }
                return new V3Dtype(x, y, 0);
            }
        }
        class M3Dtype {
            constructor(ax = 0, ay = 0, az = 0, bx = 0, by = 0, bz = 0, cx = 0, cy = 0, cz = 0) {
                this.ax = ax;
                this.ay = ay;
                this.az = az;
                this.bx = bx;
                this.by = by;
                this.bz = bz;
                this.cx = cx;
                this.cy = cy;
                this.cz = cz;
            }
            create_rot_n(n, a) {
                // rotate by a around normal vector n
                this.ax = n.x * n.x * (1 - Math.cos(a)) + Math.cos(a);
                this.ay = n.y * n.x * (1 - Math.cos(a)) + n.z * Math.sin(a);
                this.az = n.z * n.x * (1 - Math.cos(a)) - n.y * Math.sin(a);
                //
                this.bx = n.x * n.y * (1 - Math.cos(a)) - n.z * Math.sin(a);
                this.by = n.y * n.y * (1 - Math.cos(a)) + Math.cos(a);
                this.bz = n.z * n.y * (1 - Math.cos(a)) + n.x * Math.sin(a);
                //
                this.cx = n.x * n.z * (1 - Math.cos(a)) + n.y * Math.sin(a);
                this.cy = n.y * n.z * (1 - Math.cos(a)) - n.x * Math.sin(a);
                this.cz = n.z * n.z * (1 - Math.cos(a)) + Math.cos(a);
            }
            create_rot_z(a) {
                ax = Math.cos(a);
                ay = Math.sin(a);
                az = 0;
                bx = -Math.sin(a);
                by = Math.cos(a);
                bz = 0;
                cx = 0;
                cy = 0;
                cz = 1;
            }
            mmul(p) {
                return new V3Dtype(this.ax * p.x + this.bx * p.y + this.cx * p.z, this.ay * p.x + this.by * p.y + this.cy * p.z, this.az * p.x + this.bz * p.y + this.cz * p.z);
            }
            toString(name = "M3D") {
                s = "";
                s += name;
                s += "(";
                s += to_string(ax);
                s += ", ";
                s += to_string(bx);
                s += ", ";
                s += to_string(cx);
                s += ")";
                s += "\n";
                s += name;
                s += "(";
                s += to_string(ay);
                s += ", ";
                s += to_string(by);
                s += ", ";
                s += to_string(cy);
                s += ")";
                s += "\n";
                s += name;
                s += "(";
                s += to_string(az);
                s += ", ";
                s += to_string(bz);
                s += ", ";
                s += to_string(cz);
                s += ")";
                s += "\n";
                return s;
            }
        }
