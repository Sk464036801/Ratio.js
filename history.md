##Ratio.js Release Notes##
__Project Page:__ <https://github.com/LarryBattle/Ratio.js>  <br/>
__Date:__ 09/09/12 <br/>

__@Version: 0.2.3__ <br/>
* Changed the overall folder scripts to make it smaller and easier to understand.<br/>
* Updated: Build script, `dev/jakeFile.js`. Read the source for the requirements.<br/>
	Build script features:
	
	- Updated version information in Ratio.js
	- Minimize Ratio.js to Ratio.min.js
	- Updated documentation using YUI Docs.
	
* Added: `Ratio.prototype.flip()`<br/>
* Added: `Ratio.prototype.toMixedNumber()`<br/>

__@Version: 0.2.2__ <br/>
* Added: `jakefile.js` for automation. <br/>
* Replaced `doc` folder with output from yuidoc. <br/> <br/>

File: tests\Ratio_testcases.html <br/>
* Feature: Allow for `src\Ratio.js` and `src\Ratio.min.js` to be tested without reloading or editing the page. <br/>

File: .\jakefile.js <br/>
* Feature: Added a compress option to create Ratio.min.js <br/>
* Feature: Added a documentation option to create the doc folder. <br/>

Folder: .\metrics\ <br/>
* Added: Simple metrics cases for Ratio.js. <br/>

Folder: .\vendor\YUI <br/>
* Added: Will be used for metrics. <br/>

__@Version: 0.2.1__ <br/>
File: "release notes.md" <br/>
* Added: "release notes.md" to keep track of changes. <br/>
 <br/>
File: src/Ratio.js <br/>
* Added: Ratio.prototype.findX. <br/> <br/>
File: test/js/Ratio_testcases.js <br/>
* Added: tests for Ratio.prototype.getPrimeFactors. <br/>
* Added: tests for Ratio.prototype.findX. <br/>
* Enhancement: Added more tests for scientific notation compatibility. <br/>
 <br/>
File: test/Ratio.js_testcases.html <br/>
* Added: UTF-8 as the character set. <br/>
 <br/>
File: vendor/qunit/ <br/>
* Upgraded to qUnit 1.9.0pre. <br/>
 <br/>

__@Version: Version <= 0.2__ <br/>
Refer to the change log in git for release notes of previous version. <br/>