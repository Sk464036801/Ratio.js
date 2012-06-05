/**
* @project Ratio.js
* @purpose Testcases for new Ratio.js
* @author Larry Battle , <http://bateru.com/news/>
* @license MIT and GPL 3.0 
* MIT License <http://www.opensource.org/licenses/mit-license>
* GPL v3 <http://opensource.org/licenses/GPL-3.0>
* @info Project page: <https://github.com/LarryBattle/Ratio.js/>
* @version Beta 0.1.6, 2012.06.5
*/
$(function(){
	module( "Instantiation" );
	test( "test new Ratio creation", function(){
		var func = function(a,b){
			return Ratio(a,b).toString();
		};
		equal( new Ratio(), "0" );
		equal( func(), "0" );
		equal( func(3), "3" );
		equal( func(1,3), "1/3" );
		equal( func(3,1), "3" );
		equal( func(10,10), "1" );
		equal( func(400,5), "80" );
		equal( func(3,2), "3/2" );
		equal( func(1,3), "1/3" );
		equal( func(-4,3), "-4/3" );
		equal( func(4,-3), "-4/3" );
		equal( func(-4,-3), "4/3" );
	});
	test( "test Ratio.prototype.clone with no arguments", function(){
		var a = Ratio(1,3);
		var b = a.clone();
		var c = Ratio(20,9);
		equal( a.equals( b ), true );
		equal( b.equals( a ), true );
		equal( b.equals( c ), false );
		equal( c.equals( a ), false );
	});
	test( "test Ratio.prototype.clone with arguments", function(){
		var a = Ratio(11,12,"string",true);
		deepEqual( a.clone(), a );
		deepEqual( a.clone(7), Ratio(7,12,"string",true) );
		deepEqual( a.clone(null,7), Ratio(11,7,"string",true) );
		deepEqual( a.clone(null,null,""), Ratio(11,12,"",true) );
		deepEqual( a.clone(null,null,null,false), Ratio(11,12,"string",false) );
		
		deepEqual( a.clone(1,null,"",false), Ratio(1,12,"",false) );
		deepEqual( a.clone(1,2,null,false), Ratio(1,2,"string",false) );
		deepEqual( a.clone(1,2,"decimal",false), Ratio(1,2,"decimal",false) );
	});
	test( "test Ratio.prototype.clone with change to internal attributes", function(){
		var a = Ratio(1,3);
		var b = a.clone();
		equal( a.equals( b ), true );
	});	
	test( "test Ratio creation with invalid input", function(){
		var func = function(a,b){
			return Ratio(a,b).toString();
		};
		equal( (func()), "0" );
		equal( (func(null,null)), "0" );
		equal( func(null,2), "0" );
		
		equal( func({},2), "0" );
		equal( func([],1), "0" );
		equal( func(true,1), "0" );
		
		equal( func(function(){},2), "0" );
		equal( func(false,2), "0" );
		equal( func(false,true), "0" );
		
		equal( func("ten", "ten"), "0" );
		equal( func(/ten/,1), "0" );
		equal( func(Infinity), Infinity );
		
		equal( func(Infinity,1), Infinity );
		equal( func(Infinity,"0"), Infinity );
		equal( func(-Infinity,"0"), -Infinity );
		
		equal( (func(Infinity,Infinity)), "NaN" );
		equal( (func(NaN,0)), "NaN" );
	});
	
	module( "Format Types" );
	test( "test Ratio.prototype.toString()", function(){
		equal( Ratio(1,2).toString(), "1/2" );
		equal( Ratio(-1,-2).toString(), "1/2" );
		equal( Ratio(1e2,2e4).toString(), "100/20000" );
		equal( Ratio(-1e100,4).toString(), "-2.5e+99" );
	});
	test( "test Ratio.prototype.toFraction()", function(){
		var func = function(a,b){
			return Ratio(a,b).toFraction();
		};
		equal( func(), "0/1" );
		equal( func(1,2), "1/2" );
		equal( func(2,1), "2/1" );
		equal( func(10,5), "10/5" );
		equal( func(9,9), "9/9" );
	});
	test( "test Ratio.prototype.toArray()", function(){
		var func = function(a,b){
			return (Ratio(a,b)).toArray();
		};
		deepEqual( func(1,2), [1,2] );
		deepEqual( func(-1,-2), [1,2] );
		deepEqual( func(0.34,2e3), [0.34,2e3] );
		deepEqual( func(10.23e100,-23.04), [-10.23e100,23.04] );
	});
	test( "test Ratio.prototype.valueOf()", function(){
		equal( Ratio(2,2), 1 );
		equal( Ratio(1,2), 1/2 );
		equal( Ratio(1,4), 1/4 );
		equal( Ratio(1,3), 1/3 );
		equal( Ratio(1e100,4), 1e100/4 );
		equal( Ratio(1e-4,3), 1e-4/3 );
	});
	test( "test type enforcement", function(){	
		var a = Ratio(1,4);
		a.type = "string";
		equal( 1+a, "11/4" );
		equal( "Ratio = "+a, "Ratio = 1/4" );
		equal( isNaN( a ), true );
		
		a.type = "decimal";
		equal( 1+a, 1.25 );
		equal( "Ratio = "+a, "Ratio = 0.25" );
		equal( isNaN( a ), false );
		
		a.type = "";
		equal( 1+a, 1.25 );
		equal( "Ratio = "+a, "Ratio = 0.25" );
		equal( "Ratio = "+a.toString(), "Ratio = 1/4" );
		equal( isNaN( a ), false );
	});
	
	module( "Property Changes" );
	test( "test divider sign change", function(){
		var a = Ratio(1,2);
		equal( a.toString(), "1/2" );
		a.divSign = ":";
		equal( a.toString(), "1:2" );
	});
	test( "test changing numerator", function(){
		var a, b;
		a = Ratio(1,2);
		b = Ratio(3,2);
		a.numerator = 3;
		equal( a.equals(b), true );
	});
	test( "test changing denominator", function(){
		var a, b;
		a = Ratio(1,2);
		b = Ratio(1,3);
		a.denominator = 3;
		equal( a.equals(b), true );
	});
	module( "Parsers" );
	test( "test Ratio.parseDecimal()", function(){
		var func = Ratio.parseDecimal;
		deepEqual( func( [] ), [] );
		deepEqual( func( {} ), [] );
		deepEqual( func( "apple" ), [] );
		
		deepEqual( func( "0" ), [0, 1] );
		deepEqual( func( "15" ), [15,1] );
		deepEqual( func( "0.112" ), [112,1000] );
		deepEqual( func( "23.0" ), [23, 1] );
		deepEqual( func( "23.123" ), [23123, 1000] );
	});
	test( "test Ratio.parseENotation()", function(){
		var func = Ratio.parseENotation;
		deepEqual(func( null ), []);
		deepEqual(func( NaN ), []);
		deepEqual(func( "happy" ), []);
		deepEqual(func( "1.1e1.1" ), []);
		
		deepEqual(func( "10" ), [10,1]);
		deepEqual(func( "2e1" ), [20,1]);
		deepEqual(func( "-2.0004e2" ), [-20004, 100] );
		deepEqual(func( "-2.0004e5" ), [-200040, 1] );
		deepEqual(func( "-2.0004e-2" ), [-20004, 1000000] );
		deepEqual(func( "-2.0004e-5" ), [-20004, 1000000000] );
	});
	test( "test Ratio.parseNumber()", function(){
		var func = Ratio.parseNumber;
		deepEqual( func(), [] );
		
		deepEqual( func(0), [0,1] );
		deepEqual( func(1), [1,1] );
		deepEqual( func(-1), [-1,1] );
		deepEqual( func(1.2e6), [1200000, 1] );
		deepEqual( func(0.231), [231,1000] );
		deepEqual( func(-123.484), [-123484, 1000] );
	});
	test( "test Ratio.parseToArray()", function(){
		var func = Ratio.parseToArray;
		deepEqual( func("apples"), []);
		deepEqual( func(true), []);
		deepEqual( func([]), [] );
		
		deepEqual( func( 0 ), [0,1] );
		deepEqual( func( 123 ), [123, 1]);
		deepEqual( func( 423 ), [ 423, 1 ]);
		
		deepEqual( func( "3" ), [ 3, 1 ]);
		deepEqual( func( " 3  " ), [ 3, 1 ]);
		deepEqual( func(" 3/1"), [ 3, 1 ]);
		
		deepEqual( func("3/ 2"), [ 3, 2 ]);
		deepEqual( func("1 / 3"), [1, 3 ]);
		deepEqual( func("-4/ 3"), [-4, 3 ]);
		
		deepEqual( func(" 4 /-3"), [-4, 3 ]);
		deepEqual( func("-4 /-3"), [4, 3 ]);
		deepEqual( func( (Ratio(4,3)) ), [4,3 ]);
		
		deepEqual( func( (Ratio(-4,3)) ), [-4,3 ]);
		deepEqual( func( (Ratio(4,-3)) ), [-4,3 ]);
		deepEqual( func( (Ratio(-4,-3)) ), [4,3 ]);
		
		deepEqual( func(Number(1.12)), [112,100 ]);
		deepEqual( func(0.771), [771,1000 ]);
		deepEqual( func(1e3), [1000, 1 ]);
		
		deepEqual( func("1e-5"), [1,100000 ]);
		deepEqual( func("-1e-5"), [-1,100000 ]);
		deepEqual( func(1.01e3), [ 1010,1 ]);
		
		deepEqual( func(1e101), [ 1e101, 1 ]);
		deepEqual( func(1.01e-3), [101, 100000]);
		deepEqual( func(1.01e-30), [101, 1e32]);
		
		deepEqual( func(-1.01e-30), [-101, 1e32]);
	});
	test( "test Ratio.parse() with singal arguments.", function(){
		var func = Ratio.parse;
		equal( func("-0.125").toString(), "-125/1000" );
		equal( func( Ratio(3) ).toString(), "3" );
		equal( func(3).toString(), "3" );
		equal( func("-3.0e-1").toString(), "-3/10" );
		equal( func(3.0).toString(), "3" );
		equal( func(Ratio(-1,3)).toString(), "-1/3" );
	});
	test( "test Ratio.parse() with double arguments.", function(){
		var func = Ratio.parse;
		equal( func(0.125,0.5).toString(), "1250/5000" );
		equal( func(0.125,"1/2").toString(), "250/1000" );
		equal( func(3, Ratio(2)).toString(), "3/2" );
		
		equal( func(3, Ratio(1)).toString(), "3" );
		equal( func(Ratio(1),3).toString(), "1/3" );
		equal( func(Ratio(-4),Ratio(3)).toString(), "-4/3" );
		
		equal( func(Ratio(4,5).toString(),Ratio(-3,2).toString()).toString(), "-8/15" );
	});
	test( "test Ratio.prototype.reParse()", function(){
		deepEqual( Ratio(1.2,1.5).reParse().toString(), Ratio.parse(1.2,1.5).toString() );
		deepEqual( Ratio(-1.2e-10,1.5e15).reParse().toString(), Ratio.parse(-1.2e-10,1.5e15).toString() );
	});
	
	module( "Core Functions" );
	test( "test Ratio.isNumeric()", function(){
		var func = Ratio.isNumeric;
		equal( func( null ), false );
		equal( func( true ), false );
		equal( func( false ), false );
		equal( func( "NaN" ), false );
		equal( func( NaN ), false );
		equal( func( [] ), false );
		equal( func( {} ), false );
		equal( func( new Object() ), false );
		equal( func( undefined ), false );
		
		equal( func( new Number(12) ), true );
		equal( func( 1 ), true );
		equal( func( 0x3 ), true );
		equal( func( 1.1e10 ), true );
	});
	test( "test Ratio.getNumeratorWithSign()", function(){
		var func = Ratio.getNumeratorWithSign;
		equal( func(1,1), 1 );
		equal( func(-1,-1), 1 );
		equal( func(-1,1), -1 );
		equal( func(1,-1), -1 );
		
		equal( func( Infinity,1), Infinity );
		equal( func(-Infinity,-1), Infinity );
		equal( func(-Infinity,1), -Infinity );
		equal( func(1,-Infinity), -1 );
	});
	test( "test Ratio.gcd", function(){
		var func = Ratio.gcd;
		equal( func(0, 2), 1 );
		equal( func({}, 2), 1 );
		equal( func(null, true), 1 );
		equal( func(1, true), 1 );
		equal( func(1), 1 );
		equal( func(1, Infinity ), 1 );
		equal( func(-1, 2), 1 );
		equal( func(1, 1), 1 );
		equal( func(1, 2), 1 );
		equal( func(3, 6), 3 );
		equal( func(-3, 6), 3 );
		equal( func(4, 8), 4 );
		equal( func(10, 20), 10 );
		equal( func(41329375731, 82658751462), 41329375731 );
	});
	
	module( "Basic Operations" );
	test( "test equivalance using Ratio.prototype.equals and ==", function(){
		var a, b, c, d, e;
		a = Ratio();
		b = Ratio();
		c = Ratio(3,4);
		d = Ratio(3,4);
		e = Ratio(12,12);
		f = Ratio(12,12);
		
		equal( a.equals(a), true, "identity check using equals" );
		equal( b.equals(b), true, "identity check using equals" );
		equal( c.equals(c), true, "identity check using equals" );
		equal( d.equals(d), true, "identity check using equals" );
		
		equal( a.equals(b), true, "identity check using equals" );
		equal( +a == +b, true, "identity check using ==" );
		
		equal( c.equals(d), true, "identity check using equals" );
		equal( +c == +d, true, "identity check using ==" );
		
		equal( a.equals(c), false, "identity check" );
		equal( +a == +c, false, "identity check" );
		
		equal( e.equals(c), false, "identity check" );
		equal( f.equals(c), false, "identity check" );
	});
	test( "test comparison", function(){
		var a = Ratio(1,2);
		var b = Ratio(1,4);
		var c = Ratio(150,3);
		ok( a > b );
		ok( c >= b );
		ok( c >= a );
		ok( b < a );
		ok( b <= c );
	});
	test( "test addition with +", function(){
		equal( Ratio() + Ratio(), 0 );
		equal( Ratio(0) + Ratio(0), 0);
		equal( Ratio(-1) + Ratio(1), 0 );
		equal( Ratio(1) + Ratio(2), 3 );
		equal( Ratio(40) + Ratio(2), 42 );
		equal( Ratio(20001,40002) + Ratio(400,800), 1 );
		equal( Ratio(1,2) + Ratio(1,2), 1 );
		equal( Ratio(1) + Ratio(1,2), 1.5 );
		equal( Ratio(1) + Ratio(1,3), 4/3 );
		equal( Ratio(1,3) + Ratio(-1,3), 0 );
	});
	test( "test Ratio.prototype.add()", function(){
		equal( Ratio().add(Ratio()).toString(), "0" );
		equal( Ratio(0).add(Ratio(0)).toString(), "0" );
		equal( Ratio(2,4).add(Ratio(4,8)).toString(), "1" );
		equal( Ratio(1,2).add(Ratio(1,2)).toString(), "1" );
		equal( Ratio(1).add(Ratio(1)).toString(), "2" );
		equal( Ratio(1).add(Ratio(2)).toString(), "3" );
		equal( Ratio(40).add(Ratio(2)).toString(), "42" );
		equal( Ratio(1).add(Ratio(1,2)).toString(), "3/2" );
		equal( Ratio(2,5).add(Ratio(3,4)).toString(), "23/20" );
		equal( Ratio(1,3).add(Ratio(3,9)).toString(), "6/9" );
		equal( Ratio(4,9).add(Ratio(3,9)).toString(), "7/9" );
	});
	test( "test addition with -", function(){
		equal( Ratio() - Ratio(), 0 );
		equal( Ratio(1,4) - Ratio(1,4), 0 );
		equal( Ratio(1,5) - Ratio(1,2), "-0.3" );
		equal( Ratio(1,20) - Ratio(1,100), "0.04" );
	});
	test( "test Ratio.prototype.subtract()", function(){
		equal( Ratio().subtract(Ratio()).toString(), "0" );
		equal( Ratio(0).subtract(Ratio(0)).toString(), "0" );
		equal( Ratio(1,3).subtract(Ratio(3,9)).toString(), "0" );
		equal( Ratio(2,4).subtract(Ratio(4,8)).toString(), "0" );
		equal( Ratio(1).subtract(Ratio(1,2)).toString(), "1/2" );
		equal( Ratio(4).subtract(Ratio(1)).toString(), "3" );
		equal( Ratio(4,9).subtract(Ratio(3,9)).toString(), "1/9" );
		equal( Ratio(10,2).subtract(Ratio(9,19)).toString(), "172/38" );
		equal( Ratio(1).subtract(Ratio(3,2)).toString(), "-1/2" );
		equal( Ratio(1).subtract(Ratio(4)).toString(), "-3" );
		equal( Ratio(2,5).subtract(Ratio(3,4)).toString(), "-7/20" );
		equal( Ratio(1,9).subtract(Ratio(4,9)).toString(), "-3/9" );
	});

	test( "test Ratio.prototype.multiply", function(){
		var func = function(a,b,c,d){
			return ( Ratio( a,b) ).multiply( c, d ).toString();
		};
		equal( func(1,1,1,1), "1" );
		equal( func(1,1,2,1), "2" );
		equal( func(-100,1,432,-1), "43200" );
		equal( func(2,3,4,9), "8/27" );
		equal( func(12,34,2,-54), "-24/"+(34*54) );
		equal( func(12,34,2,-54), "-24/"+(34*54) );
		equal( func(-213,-423,-123,-123), (213*123)+"/"+(123*423) );
		equal( func(-213,-423,0,0), "NaN" );
	});
	test( "test Ratio.prototype.divide", function(){
		var func = function(a,b,c,d){
			return ( Ratio( a,b) ).divide( c, d ).toString();
		};
		equal( func(0,1,1,10), "0" );
		equal( func(1,1,1,1), "1" );
		equal( func(10,3,100,30), "1" );
		equal( func(1,4,1,20), "5" );
		equal( func(-10,23,13,-39), (39*10)+"/"+(13*23) );
		equal( func(-12,-34,-45,-67), (12*67)+"/"+(45*34) );
	});
	test( "test Ratio.getRepeatProps() with invalid input", function(){
		var func = Ratio.getRepeatProps;
		deepEqual( func( "" ), [] );
		deepEqual( func( [] ), [] );
		deepEqual( func( {} ), [] );
		deepEqual( func( Math.PI ), [] );
		deepEqual( func( null ), [] );
		deepEqual( func( true ), [] );
		deepEqual( func( Infinity ), [] );
		deepEqual( func( NaN ), [] );
		deepEqual( func( 1/5 ), [] );
		deepEqual( func( 1/100 ), [] );
		deepEqual( func( "1.2.3" ), [] );
		deepEqual( func( "1.333333" ), [] );
	});	
	test( "test Ratio.getRepeatProps() with valid input", function(){
		var func = Ratio.getRepeatProps;
		
		deepEqual( func( "1.1111111111" ), [ "1", "", "1" ] );
		deepEqual( func( "1234.11111111111" ), [ "1234", "", "1" ] );
		deepEqual( func( "1.12312311111111" ), [ "1", "123123", "1" ] );
		
		deepEqual( func( "12.12121212121212" ), [ "12", "", "12" ] );
		deepEqual( func( "1234.1111212121212" ), [ "1234", "111", "12" ] );		
		deepEqual( func( "2.123412341234" ), ["2","","1234"] );
		
		deepEqual( func( "3534.3344512341234" ), ["3534","33445","1234"] );
		deepEqual( func( 1/333 ), ["0","","003" ] );
		deepEqual( func( 7/13 ), ["0","5384","615384" ] );
		deepEqual( func( 1/111 ), ["0","","009" ] );
		deepEqual( func( 11/111 ), ["0","","099" ] );
		deepEqual( func( 100/11 ), ["9","","09" ] );
		deepEqual( func( 100/13 ), ["7","692","307692" ] );
		deepEqual( func( 1/3 ), ["0","","3" ] );
		deepEqual( func( 4/3 ), ["1","","3" ] );
	});
	test( "test Ratio.prototype.reduce()", function(){
		var func = function(a,b){
			return Ratio.parse(a,b).reduce().toString();
		};
		equal( func(), "0");
		equal( func(0), "0");
		equal( func(1), "1");
		
		equal( func(1,3), "1/3");
		equal( func(3,9), "1/3");
		equal( func(1/100), "1/100");
		
		equal( func(7/3), "7/3");
		equal( func(1/111), "1/111");
		equal( func(1/333), "1/333");
	});
	test( "test Ratio.reduce()", function(){
		var func = Ratio.reduce;
		deepEqual( func( 1,2 ), [ 1, 2] );
		deepEqual( func( 4,8 ), [ 1, 2] );
		deepEqual( func( 100,200 ), [ 1, 2] );
		deepEqual( func( -42,42 ), [ -1, 1] );
		deepEqual( func( 134,-3 ), [ -134, 3] );
	});
	
	module( "Use Cases" );
	test( "test user case", function(){
		var a = Ratio(1,2, "string");
		equal( a, "1/2" );
		a = a.add(3);
		equal( a, "7/2" );
		a = a.subtract(2);
		equal( a, "3/2" );
		a = a.divide("3/2");
		equal( a, "1" );
		equal( a.multiply(12).reduce(), 12 );
		equal( a, "1" );
	});
	
	module( "Extra Functionality" );
	test( "test Ratio.prototype.descale", function(){
		var func = function(a,b,c){
			return (Ratio(a,b)).descale(c).toString();
		};
		equal( func( 25, 100,5), "5/20" );
		equal( func( 5, 100,5), "1/20" );
		equal( func( 5, 100,5.0), "1/20" );
		notEqual( func( 5, 100,5.1), "1/20" );
	});
	test( "test Ratio.prototype.scale()", function(){
		var func = function(a,b,c){
			return (Ratio(a,b)).scale(c).toString();
		};
		equal( func(2,3,5), "10/15" );
		equal( func(2,3,3e-10), "6e-10/9e-10" );
		equal( func(1,2,5), "5/10" );
		equal( func(1,2,2.5), "2.5/5" );
	});
	test( "test Ratio.prototype.abs()", function(){
		var func = function(a,b){
			return (Ratio(a,b)).abs().toString();
		};
		equal( func(1,2), "1/2" );
		equal( func(-1,2), "1/2" );
		equal( func(-1,-2), "1/2" );
		equal( func(1,2), "1/2" );
		equal( func(-1e23,21), "1e+23/21" );
	});
	test( "test Ratio.prototype.mod()", function(){
		var func = function(a,b){
			return (Ratio(a,b)).mod().toString();
		};
		equal( func(5,0), 0 );
		equal( func(5,1), 0 );
		equal( func(5,2), 1 );
		equal( func(5,20), 5 );
		equal( func(5e2,21), 17 );
	});
	test( "test Ratio.prototype.negate()", function(){
		var func = function(a,b){
			return (Ratio(a,b)).negate().toString();
		};
		equal(func(1,2), "-1/2" );
		equal(func(-1,2), "1/2" );
		equal(func(1,-2), "1/2" );
		equal(func(-1e-10,2e22), "1e-10/2e+22" );
	});
	test( "test Ratio.prototype.isProper()", function(){
		var func = function(a,b){
			return (Ratio(a,b)).isProper();
		};
		equal(func(1,2), true );
		equal(func(1e2,2e2), true );
		equal(func(10,2), false );
		equal(func(1e5,2e2), false );
	});
	test( "test Ratio.prototype.getPrimeFactors", function(){
		var func = Ratio.getPrimeFactors;
		deepEqual( func(Infinity ), [] );
		deepEqual( func({} ), [] );
		deepEqual( func(null ), [] );
		deepEqual( func(-1 ), [] );
		deepEqual( func(0 ), [] );
		deepEqual( func(1 ), [] );
		deepEqual( func(2 ), [2] );
		deepEqual( func(6 ), [2,3] );		
		deepEqual( func(9 ), [3,3] );
		deepEqual( func("729" ), [3,3,3,3,3,3] );
		deepEqual( func(3333333791 ), [2347, 1420253] );
		deepEqual( func(123456789 ), [3,3,3607,3803] );
		deepEqual( func(9876543210 ), [2,3,3,5,17,17,379721] );
		deepEqual( func("103103103" ), [3,103,333667] );
	});
	
});