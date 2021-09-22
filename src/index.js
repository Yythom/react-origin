import ReactDOM from "./kreact/rc-dom";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border fn">
      <p>{props.name}</p>
    </div>
  );
}

const jsx = (
  <div>
    <h1 style={{ color: '#999', fontSize: '18px' }} >render</h1>
    <a href="https://www.baidu.com/">baidu</a>
    {/* <div>
      <p>1212</p>
    </div> */}
    <FunctionComponent name="函数" />
    {/* <ClassComponent name="class" /> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
// 原生标签
// 文本节点
