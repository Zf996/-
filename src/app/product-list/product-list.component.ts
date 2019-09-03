import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
private productList:any = []//商品列表
private pno = 0    //当前加载的是第几页数据
@ViewChild('myInfiniteScroll',{static:true})
private myInfiniteScroll;
  constructor(private nav:NavController,private http:HttpClient,private api:ApiService) { }

  ngOnInit() {
    // 组件初始化完成立即加载第一页的商品数数据
    
    this.loadData();
  }
  goBack(){
    this.nav.back();
  }
  loadData(){
    this.pno++;
    // 异步请求服务器端的商品数据
    this.http.get(this.api.productListApi+'?pno='+this.pno).subscribe((res:any)=>{
      // console.log(res);
      this.productList = this.productList.concat(res.data);
      console.log(this.productList)
    })
    setTimeout(() => {
      this.myInfiniteScroll.complete();//加载完成
    }, 3000);
  }
  
}
