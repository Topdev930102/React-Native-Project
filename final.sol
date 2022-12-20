// SPDX-License-Identifier: MIT
// Specifies that the source code is for a version
// of Solidity greater than 0.8.15
pragma solidity ^0.8.16;
// A contract is a collection of functions and data (its state)
// that resides at a specific address on the Ethereum blockchain.
// import "github.com/arachnid/solidity-stringutils/src/strings.sol";
import "github.com/Arachnid/solidity-stringutils/src/strings.sol";
contract Formulas {
    using strings for *;

    struct AvailableFormula {
        string myFormula;
    }
    struct Detail {
        string color;
        uint price;
    }
    struct Computer {
        string name;
        string company;
        Detail detail;
    }
    struct Machine{
        string name;
    }
    struct Grocery{
        string name;
    }
    struct Cloth{
        string name;
    }

    struct ProductionJson {
        Computer [] computers;
        Machine machine;
        Grocery grocery;
        Cloth cloth;
    }

    struct Param{
        string category;
        string name;
        string[] params;
        string path;
        string data_type;
        string[] types;
    }

    struct Action{
        int id;
        string action_name;
        string color;
        string price;
        string product_name;
    }

    struct BusinessRule{
        string name;
        Action[] actions;
        Param[] params;
    }

    struct CustomFunction{
        string name;
        Param[] params;
    }


    uint private _formulaID = 0;
    uint private _computerID = 0;
    uint private _ruleID=0;
    uint private _functionID=0;
    mapping(uint => AvailableFormula) private _availableFormulas;
    mapping(uint => BusinessRule) private _businessRules;
    mapping(uint=>CustomFunction) private _customFunctions;
    ProductionJson private _productJson;
    constructor() {
        Detail memory detail = Detail("red", 150);
        Computer memory computer = Computer("Electronics","Acer", detail);
        _computerID = 1;
        Computer[]    memory id = new Computer[](_computerID);
        for (uint i = 0; i < _computerID; i++) {
            id[i] = computer;
        }
        _productJson.computers.push(computer);
        _productJson.machine = Machine("motor");
        _productJson.grocery = Grocery("cake");
        _productJson.cloth = Cloth("shirt");
        }
    function getProductJson() public view returns (ProductionJson memory){
       return _productJson;
    }
    function updateProductJson(uint id, string memory name, string memory company, string memory color, uint price) public {
        delete _productJson.computers[id];
        Detail memory detail = Detail(color,price);
         Computer memory computer = Computer(name,company, detail);
        _productJson.computers[id]=computer;
    }
    function createProductJson(string memory name, string memory company, string memory color, uint price) public {
        Detail memory detail = Detail(color,price);
         Computer memory computer = Computer(name,company, detail);
         _productJson.computers.push(computer);
    }
    function deleteProductJson(uint id) public {
        delete _productJson.computers[id];
    }

    function pushFormula(string memory input) public {
        AvailableFormula memory availableFormulas = AvailableFormula(
            input
        );
        _availableFormulas[_formulaID] = availableFormulas;
        _formulaID ++;
    }

    function pushFunction(string memory name, Param[] memory params) public {
        _customFunctions[_functionID].name=name;
        for(uint i=0; i<params.length; i++){
            _customFunctions[_functionID].params.push(params[i]);
        }
        _functionID++;
    }

    function pushRule(string memory name, Action[]  memory actions, Param[]  memory params  ) public{
        _businessRules[_ruleID].name=name;
        for (uint i = 0; i < actions.length; i++) {
            _businessRules[_ruleID].actions.push(actions[i]);
        }
        for(uint j=0; j<params.length;j++){
             _businessRules[_ruleID].params.push(params[j]);
        }
        _ruleID++;
    }

    function updateFunction(uint id, string memory name, Param[]  memory params  ) public{
        delete _customFunctions[id];
        _customFunctions[id].name=name;
        for(uint i=0; i<params.length;i++){
             _customFunctions[id].params.push(params[i]);
        }
    }

    function updateRule(uint id, string memory name, Action[]  memory actions, Param[]  memory params  ) public{
        delete _businessRules[id];
        _businessRules[id].name=name;
        for (uint i = 0; i < actions.length; i++) {
            _businessRules[id].actions.push(actions[i]);
        }
        for(uint j=0; j<params.length;j++){
             _businessRules[id].params.push(params[j]);
        }
    }

    function getFormula() public view returns (uint, AvailableFormula[] memory) {
        AvailableFormula[]    memory id = new AvailableFormula[](_formulaID);
        for (uint i = 0; i < _formulaID; i++) {
            AvailableFormula storage formulas = _availableFormulas[i];
            id[i] = formulas;
        }
       return (_formulaID, id);
    }

    function getRule() public view returns (uint, BusinessRule[] memory){
        BusinessRule[] memory id=new BusinessRule[](_ruleID);
        for(uint i=0;i<_ruleID;i++){
            BusinessRule storage rules=_businessRules[i];
            id[i]=rules;
        }
        return (_ruleID, id);
    }

    
    function getFunction() public view returns (uint, CustomFunction[] memory){
        CustomFunction[] memory id=new CustomFunction[](_functionID);
        for(uint i=0;i<_functionID;i++){
            CustomFunction storage functions=_customFunctions[i];
            id[i]=functions;
        }
        return (_functionID, id);
    }

    // Math functions
    function add(int a, int b) public pure returns (int)
    {
        int Sum = a + b ;
         
        // Sum of two variables
        return Sum;
    }
    function sub(int a, int b) public pure returns (int)
    {
        int res = a - b ;
         
        // Sum of two variables
        return res;
    }
    function mul(int a, int b) public pure returns (int)
    {
        int res = a * b ;
         
        // Sum of two variables
        return res;
    }
    function div(int a, int b) public pure returns (int)
    {
        int res = a / b ;
         
        // Sum of two variables
        return res;
    }
    function pow(int a, uint b) public pure returns (int)
    {
        int res = a ** b ;
         
        // Sum of two variables
        return res;
    }

    // Text functions
    function len(string memory s) public pure returns (uint)
    {
         return bytes(s).length;
    }
    function toUpper(string memory str) public pure returns (string memory) {
		bytes memory bStr = bytes(str);
		bytes memory bUpper = new bytes(bStr.length);
		for (uint i = 0; i < bStr.length; i++) {
			// Uppercase character...
			if ((uint8(bStr[i]) >= 97) && (uint8(bStr[i]) <= 122)) {
				// So we add 32 to make it lowercase
				bUpper[i] = bytes1(uint8(bStr[i]) - 32);
			} else {
				bUpper[i] = bStr[i];
			}
		}
		return string(bUpper);
	}

    // Statistics functions
    function avg(int a, int b) public pure returns (int)
    {
         return (a + b) / 2;
    }
    function max(int a, int b) public pure returns (int)
    {
         return a > b ? a : b;
    }
    function min(int a, int b) public pure returns (int)
    {
         return a < b ? a : b;
    }
    function contain(string memory where, string memory what) public pure returns (bool)
    {
        bytes memory whatBytes = bytes (what);
        bytes memory whereBytes = bytes (where);

        require(whereBytes.length >= whatBytes.length);

        bool found = false;
        for (uint i = 0; i <= whereBytes.length - whatBytes.length; i++) {
            bool flag = true;
            for (uint j = 0; j < whatBytes.length; j++)
                if (whereBytes [i + j] != whatBytes [j]) {
                    flag = false;
                    break;
                }
            if (flag) {
                found = true;
                break;
            }
        }
        return (found);
    }
    function exactlyMatch(string memory a, string memory b) public pure returns (bool){
        bytes memory whatBytes = bytes (a);
        bytes memory whereBytes = bytes (b);

        require(whatBytes.length == whereBytes.length);
 
        for (uint j = 0; j < whereBytes.length; j++)
            if (whatBytes [j] != whereBytes [j]) {
                return false;
            }
        return true;
    }
    function greaterThan(int a, int b) public pure returns (bool)
    {
         return a >= b ? true : false;
    }
    function lessThan(int a, int b) public pure returns (bool)
    {
         return a < b ? true : false;
    }
    function strToUint(string memory _str) public pure returns(uint256) {
        uint res = 0;
        for (uint256 i = 0; i < bytes(_str).length; i++) {
            if ((uint8(bytes(_str)[i]) - 48) < 0 || (uint8(bytes(_str)[i]) - 48) > 9) {
                return (0);
            }
            res += (uint8(bytes(_str)[i]) - 48) * 10**(bytes(_str).length - i - 1);
        }
        
        return res;
    }
    function maxInArray(string memory str) public pure returns (uint)
    {
        strings.slice memory s = str.toSlice();                
        strings.slice memory delim = ",".toSlice();                            
        uint[] memory parts = new uint[](s.count(delim) + 1);                  
        for (uint i = 0; i < parts.length; i++) {                              
           parts[i] = uint16( strToUint(s.split(delim).toString()) );                               
        }       
        uint store_var = 0;
        uint j;        
        for(j = 0; j < parts.length ; j ++){
            if(store_var < parts[j]){
                store_var = parts[j];
            }
        }
        return store_var;
    }
    function minInArray(string memory str) public pure returns (uint)
    {
        strings.slice memory s = str.toSlice();                
        strings.slice memory delim = ",".toSlice();                            
        uint[] memory parts = new uint[](s.count(delim) + 1);                  
        for (uint i = 0; i < parts.length; i++) {                              
           parts[i] = uint16( strToUint(s.split(delim).toString()) );                               
        }       
        uint store_var = 0;
        for(uint j = 0; j < parts.length ; j ++){
            if(store_var > parts[j]){
                store_var = parts[j];
            }
        }
        return store_var;
    }
    function quickSort(uint[] memory arr, int left, int right) public pure {
        int i = left;
        int j = right;
        if (i == j) return;
        uint pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)] < pivot) i++;
            while (pivot < arr[uint(j)]) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
    function sort(string memory str) public pure returns (uint[] memory) {
        strings.slice memory s = str.toSlice();                
        strings.slice memory delim = ",".toSlice();                            
        uint[] memory parts = new uint[](s.count(delim) + 1);                  
        for (uint i = 0; i < parts.length; i++) {                              
           parts[i] = uint16( strToUint(s.split(delim).toString()) );                               
        }
        quickSort(parts, int(0), int(parts.length-1));
        return parts;
    }

}