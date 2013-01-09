Memeda / 体贴的回调函数调用
========
API设计中，尤其是中间层调用，常常要写这么大一段代码：

```
var api = function (param, callback) {
  param.name = 'some name';
  async(param, function (err, data) {
    if (err) {
      return callback(err);
    }
    // 对返回结果进行加工
    var ret = data.toString();
    callback(null, ret);
  });
};
```
在社区，异常通过回调函数的第一个参数传递，已经是一个共识。但是面对到处都是的：

```
if (err) {
  return callback(err);
}
```
有时候还是会心烦。那么更语义的API来了：

```
var failing = require('memeda').failing;

var api = function (param, callback) {
  param.name = 'some name';
  async(param, failing(callback).passing(function (data) {
    // 对返回结果进行加工
    var ret = data.toString();
    callback(null, ret);
  });
};
```

## 备注
- `failing`与`passing`总是成对出现

## License
The MIT License
