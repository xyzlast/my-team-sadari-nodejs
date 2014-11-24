## express + angularjs 를 이용한 web application 개발

### Application의 구조

REST server + javascript application 형태의 application으로 생각하고 구성한다.
기본적인 yo에서 만들어지는 구성을 참고하면 보다 더 편하게 구성이 가능하다. 

```cmd
.
├── Gruntfile.js
├── app
│   ├── config
│   ├── controllers
│   ├── models
│   ├── services
│   └── views
├── app.js
├── bower.json
├── node_modules
├── npm-debug.log
├── package.json
├── public
│   ├── components
│   ├── css
│   ├── index.html
│   ├── js
│   ├── vendor
│   └── views
└── test

```

test의 경우, client/server test를 모두다 나눠주는 것이 좋다. server는 `jasmine-node`를 이용하고, client는 `jasmine`을 이용해서 구성하는 것이 가장 익숙하고, 자료가 많다. 

### 생각할 점

* angularJS는 잘 구조화된 routeProvider를 이미 가지고 있다. 따라서, 굳이 view에 대한 영역을 express에서 해줄 필요가 없다. 철저히 다음과 같은 구조로 나누는 것이 좋다.

* 기존 java application과 동일하게 server 영역과 client 영역을 나누게 되면 보다 쉽게 개발의 범위를 나눌 수 있다.

* nodejs는 single thread로 동작하게 된다. **내가 짠 코드**가 event queue의 block이 되어서 다른 event가 동작하지 않는 경우를 만들 수 있으니, 반드시 closer를 이용한 code block 형태로 구성되어야지 된다. 대부분의 nodejs module들은 callback method를 이용해서 처리하고 있다. callback을 사용하지 않는 async 형태의 method는 절대로 만들어서는 안된다. 

* promise에 대한 고려를 많이 해야지 된다. promise를 이용하지 않으면 closer 특성상 가독성이 매우 떨어지는 난해한 코드가 작성된다. 


