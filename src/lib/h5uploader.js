var H5Uploader = (function () {
  return {
    upload: function (literals) {
      var i;
      if (Object.prototype.toString.call(literals) !== '[object Array]') {
        this.handUpload(literals);
      } else {
        for (i = 0; i < literals.length; i++) {
          this.handUpload(literals[i]);
        }
      }
    },
    handUpload: function (literals) {
      var xhr;
      var body;
      var data;
      var file;
      var name;
      var evt;
      var evt1;
      var i;

      if (literals.action === undefined) {
        throw new Error('The upload action address option is undefined.');
      }
      xhr = new XMLHttpRequest();
      xhr.open('POST', literals.action, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          body = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            if (literals.success) {
              literals.success(body);
            }
          } else {
            if (literals.fail) {
              literals.fail(body);
            }
          }
        }
      };
      data = new FormData();
      if (!literals.id) {
        throw new Error('The upload id option is undefined.');
      }
      file = document.getElementById(literals.id);
      if (!file) {
        throw new Error('The upload file element is undefined::id:' +
                        literals.id);
      }
      name = file.getAttribute('name');
      if (!name) {
        throw new Error('The upload file input name is undefined.');
      }
      if (literals.size) { // Check file Size
        evt = this.checkSize(file.files, literals.size.max);
        if (evt) {
          if (literals.size.valide) {
            literals.size.valide(evt);
          }
          throw new Error('The upload file size exceed max value.');
        }
      }
      if (literals.type) { // Check file type
        evt1 = this.checkType(file.files, literals.type.name);
        if (evt1) {
          if (literals.type.valide) {
            literals.type.valide(evt1);
          }
          throw new Error('The upload file type is error.');
        }
      }
      if (literals.progress) { // Progress
        literals.progress();
      }
      for (i = 0; i < file.files.length; i++) {
        data.append(name, file.files[i]);
      }
      try {
        xhr.send(data);
      } catch (e) {
        throw new Error(e);
      }
    },
    // Validate file size
    checkSize: function (file, size) {
      var i;
      var res;
      for (i = 0; i < file.length; i++) {
        if (file[i].size > size * 1024) { // bytes
          res = file[i];
          break;
        }
      }
      return res;
    },
    // Validate file type
    checkType: function (file, type) {
      var arr;
      var i;
      var res;
      for (i = 0; i < file.length; i++) {
        arr = file[i].name.split('.');
        if (type.indexOf(arr[arr.length - 1]) === -1) {
          res = file[i];
          break;
        }
      }
      return res;
    }
  };
})();

module.exports = H5Uploader;
