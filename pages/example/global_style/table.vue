<template>
    <article>
        <section>
            <p>框架预置了常用的表格样式，通过为 <code>&lt;table&gt;</code> 添加 <code>.table</code> 样式类来实现。</p>
            <p>【示例】：</p>
            <table class="table rw-100">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Skill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Neo</td>
                    <td>javascript</td>
                </tr>
                <tr>
                    <td>Lucy</td>
                    <td>java</td>
                </tr>
                <tr>
                    <td>Nick</td>
                    <td>python</td>
                </tr>
                <tr>
                    <td>Tommy</td>
                    <td>dart + flutter</td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--宽松尺寸表格-->
        <section class="mrg-t-5">
            <h5>宽松尺寸表格</h5>
            <p>通过添加 <code>easy</code> 属性来实现。</p>
            <p>【示例】：</p>
            <table class="table rw-100" easy>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Skill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Neo</td>
                    <td>javascript</td>
                </tr>
                <tr>
                    <td>Lucy</td>
                    <td>java</td>
                </tr>
                <tr>
                    <td>Nick</td>
                    <td>python</td>
                </tr>
                <tr>
                    <td>Tommy</td>
                    <td>dart + flutter</td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--紧凑尺寸表格-->
        <section class="mrg-t-5">
            <h5>紧凑尺寸表格</h5>
            <p>通过添加 <code>compact</code> 属性来实现。</p>
            <p>【示例】：</p>
            <table class="table rw-100" compact>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Skill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Neo</td>
                    <td>javascript</td>
                </tr>
                <tr>
                    <td>Lucy</td>
                    <td>java</td>
                </tr>
                <tr>
                    <td>Nick</td>
                    <td>python</td>
                </tr>
                <tr>
                    <td>Tommy</td>
                    <td>dart + flutter</td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--线框表格-->
        <section class="mrg-t-5">
            <h5>线框表格</h5>
            <p>通过添加 <code>border</code> 属性来实现，线框颜色可以通过框架预置色彩进行设置。</p>
            <p>【示例】：</p>
            <table class="table rw-100" border>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Skill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Neo</td>
                    <td>javascript</td>
                </tr>
                <tr>
                    <td>Lucy</td>
                    <td>java</td>
                </tr>
                <tr>
                    <td>Nick</td>
                    <td>python</td>
                </tr>
                <tr>
                    <td>Tommy</td>
                    <td>dart + flutter</td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--响应式表格-->
        <section class="mrg-t-5">
            <h5>响应式表格</h5>
            <p>通过添加 <code>response</code> 属性来实现，该属性实际只控制单元格文本内容不自动换行，要真正实现响应式效果需要对表格包裹一层结构，并通过设置 <code>.auto-h-scroll</code> 样式类实现。</p>
            <p>【示例】：</p>
            <div class="flex rw-100">
                <div class="col-6 pad-r-1">
                    <div class="over-scroll">
                        <table class="table" response>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Skill</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Neo</td>
                                <td>javascript</td>
                            </tr>
                            <tr>
                                <td>Lucy</td>
                                <td>java</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>python</td>
                            </tr>
                            <tr>
                                <td>Tommy</td>
                                <td>dart + flutter</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pcenter mrg-t-2 fsize-d9">表格宽度未溢出</div>
                </div>
                <div class="col-6 pad-l-1">
                    <div class="over-scroll thick-scroll">
                        <table class="table" response>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Skill</th>
                                <th>Age</th>
                                <th>Home</th>
                                <th>Website</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Neo</td>
                                <td>javascript</td>
                                <td>24</td>
                                <td>Australia</td>
                                <td>http://www.javascript.75sea.com/example/global_style/table</td>
                            </tr>
                            <tr>
                                <td>Lucy</td>
                                <td>java</td>
                                <td>27</td>
                                <td>Britain</td>
                                <td>http://www.java.75sea.com/example/global_style/table</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>python</td>
                                <td>31</td>
                                <td>Britain</td>
                                <td>http://www.python.75sea.com/example/global_style/table</td>
                            </tr>
                            <tr>
                                <td>Tommy</td>
                                <td>dart + flutter</td>
                                <td>27</td>
                                <td>Norway</td>
                                <td>http://www.dart.75sea.com/example/global_style/table</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pcenter mrg-t-1 fsize-d9">表格宽度溢出，出现横向滚动条</div>
                </div>
            </div>
        </section>

        <!--暗色表格-->
        <section class="mrg-t-5">
            <h5>暗色表格</h5>
            <p>通过添加 <code>dark</code> 属性来实现。暗色表格也可同时启用线框样式。</p>
            <p>【示例】：</p>
            <div class="flex rw-100">
                <div class="col-6 pad-r-1">
                    <table class="table" dark>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Skill</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Neo</td>
                            <td>javascript</td>
                        </tr>
                        <tr>
                            <td>Lucy</td>
                            <td>java</td>
                        </tr>
                        <tr>
                            <td>Nick</td>
                            <td>python</td>
                        </tr>
                        <tr>
                            <td>Tommy</td>
                            <td>dart + flutter</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-6 pad-l-1">
                    <table class="table" dark border>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Skill</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Neo</td>
                            <td>javascript</td>
                        </tr>
                        <tr>
                            <td>Lucy</td>
                            <td>java</td>
                        </tr>
                        <tr>
                            <td>Nick</td>
                            <td>python</td>
                        </tr>
                        <tr>
                            <td>Tommy</td>
                            <td>dart + flutter</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </article>
</template>