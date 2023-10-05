// File System.js

(function() {
  // this is the test cases for the file system
  
  var fs = new TDFileSystem();
  // this initializes the file system class
  
  var fss = new TDFSSimplified();
  // this initializes the simplified file system class
  
  /*
  - write file
  - read file
  - write json file 
  - read json file
  */
  
  var test = new TDTest();
  //test.describe("File System", ()=>[
  test.it("Writing a file to the system", ()=>{
    // the file writing test
    
    fs.writer.text(__dirname + "/Tests/Resources/file.json", "{\"value\":0}");
    // writes the test file
    
    return 0;
  }, 0);
  
  fs.reader.text(__dirname + "/Tests/Resources/file.json", (data)=>{
    // reads the test file
    
    if (data) {
      // checks if data variable has content
      
      test.it("Reading a file to the system", data, "{\"value\":0}");
      // reads the content
      
    } else {
      // checks if there is no content
      
      test.it("Reading a file to the system", "", "{\"value\":0}");
      // reads the content
      
    }
    
  });
  
  fss.setPath("/Tests/fss-file.json");
  // sets the path
  
  // console.log(fss.getFullPath());
  
  test.it("Writing a file to the simplified", ()=>{
    // the file writing test
    
    fss.save({
      text: "Hello world"
    });
    // writes the test file
    
    return 0;
  }, 0);
  
  fss.load(data=>{
    // loads the content
    
    test.it("Reading a file to the simplified", data, {
      text: "Hello world"
    });
    // reads the content
    
  });
  
})();
