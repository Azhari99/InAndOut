let Navigation = {
    Http:{
        Get:"...",
    },
    Data:{
        Active:ko.observable(""),
        List:ko.observableArray([]),
        Await:ko.observable([]),
    },
    Set:function(val){
        this.Data.Active(val);
        val.forEach(function(x,j){
            let i = $('#side-menu a[href="'+x+'"]');
            let p = i.parent();
            let ul = p.find("ul");

            if(j==0 && ul.length>0 && p.parent().attr("id") != "side-menu"){
                p.attr("active-menu","true")
            }
            p.attr("class", "active")
            if(ul.length>0){
                ul.attr("aria-expanded", "true");
                ul.addClass("in");   
            }
            //set active parent
            if (j == 0) {
                var parent = p.closest("ul");
                parent.addClass("in");
                if (parent) {
                    var mainParent = parent.closest("li");
                    mainParent.addClass("active");
                    var a = mainParent.children("a");
                    a.attr("aria-expanded", "true");
                }
            }
        })
    },
    CheckActiveURL:function(){
        let pathname = window.location.pathname;
        let temp = pathname.split("/");
        let activeURL = []
        if(temp.length>1){
            activeURL.push("/"+temp[1])
            if(temp.length>2){
                activeURL.push("/"+temp[1]+"/"+temp[2])
            }
        }
        setTimeout(function(){
            Navigation.Set(activeURL);
        },50)
    },
    Init:async function(){
        await Navigation.Get();
    },
    Get:function(){
        return new Promise(resolve => {
            setTimeout(x=>{
                let res = this.Dummy.Get();
                this.Data.List(res);
                // apply metis menu to side-menu
                $('#side-menu').metisMenu();
                resolve();    
            },500)
            
        });
        
    },
    GetSubmenuByModule:function(module){
        return _.find(this.Data.List(),{Module:module}).Submenu;
    },
    GetByPathname:function(pathname){
        let temp = pathname.replace("/","").split("/");
        let result = [];
        let list = this.Data.List();
        list.forEach(i=>{
            if(i.Url == "/"+temp[0]){
                result.push(i);
                if(typeof(temp[1]) !== "undefined"){
                    i.Submenu.forEach(j => {
                        if(j.Url == "/"+temp[0]+"/"+temp[1]){
                            result.push(j);
                        }
                    });
                }
            }
        });
        // look for 3rdlevel menu
        if(result.length === 0){
            list.forEach(y=>{
                if(y.Url == "#"){
                    y.Submenu.forEach(i=>{
                        if(i.Url == "/"+temp[0]){
                            result.push(y);
                            result.push(i);
                            if(typeof(temp[1]) !== "undefined"){
                                i.Submenu.forEach(j => {
                                    if(j.Url == "/"+temp[0]+"/"+temp[1]){
                                        result.push(j);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
        return result;
    },
    GetByModules:function(list){
        let result = {};
        list.forEach(i=>{
            if(typeof(i.Submenu) !== "undefined"){
                i.Submenu.forEach(j=>{
                    if(typeof(result[j.Module])=="undefined"){
                        result[j.Module] = [];
                    }
                    result[j.Module].push(j);
                });
            }
        });
        let listByModules = [];
        for(var i in result){
            listByModules.push({
                Name:i,
                List:result[i]
            });
        }
        return listByModules;
    },
    Dummy:{
        Get:function(){
            return this.Data;
        },
        Data:[
            {Icon:"fa fa-th-large",Name:"Dashboard",Url:"/dashboard",Module:"Dashboard",Page:true,Submenu:[]},
            {Icon:"fa fa-database",Name:"Master",Url:"/master",Module:"Master",Page:true,Submenu:[
                // Product
                {Icon:"",Name:"Entity",Url:"/master/entity",Module:"Product",Page:false,Submenu:undefined},
                { Icon: "", Name: "Distribution Channel", Url: "/master/distributionchannel", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Sub-Distribution Channel", Url: "/master/subdistributionchannel", Module: "Product", Page: false, Submenu: undefined },
                {Icon:"",Name:"Product Type",Url:"/master/producttype",Module:"Product",Page:false,Submenu:undefined},
                {Icon:"",Name:"Product Setup",Url:"/master/productsetup",Module:"Product",Page:false,Submenu:undefined},
                {Icon:"",Name:"Product Setup Approval",Url:"/master/productsetupapproval",Module:"Product",Page:false,Submenu:undefined},
                {Icon:"",Name:"Currency",Url:"/master/currency",Module:"Product",Page:false,Submenu:undefined},
                {Icon:"",Name:"Benefits",Url:"/master/benefits",Module:"Product",Page:false,Submenu:undefined},
                {Icon:"",Name:"Age Calculation Method",Url:"/master/agecalculationmethod",Module:"Product",Page:false,Submenu:undefined},
                { Icon: "", Name: "Payment Mode", Url: "/master/paymentmode", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Payment Method", Url: "/master/paymentmethod", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Medical Type", Url: "/master/medicaltype", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Medical", Url: "/master/medical", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Question", Url: "/master/question", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Document Type", Url: "/master/documenttype", Module: "Product", Page: false, Submenu: undefined },
                { Icon: "", Name: "Document", Url: "/master/document", Module: "Product", Page: false, Submenu: undefined },

                // Credit Center
                { Icon: "", Name: "Credit Center", Url: "/master/creditcenter", Module: "Credit Center", Page: false, Submenu: undefined },
                {Icon:"",Name:"Branch Management",Url:"/master/branchmanagement",Module:"Credit Center",Page:false,Submenu:undefined},
                {Icon:"",Name:"Account Officer",Url:"/master/accountofficer",Module:"Credit Center",Page:false,Submenu:undefined},

                // Reinsurance
                {Icon:"",Name:"Reinsurance Partner",Url:"/master/reinsurancepartner",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Reinsurance Treaty",Url:"/master/reinsurancetreaty",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Reinsurance Retention",Url:"/master/reinsuranceretention",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Reinsurance Setting",Url:"/master/reinsurancesetting",Module:"Reinsurance",Page:false,Submenu:undefined},

                // Rate
                {Icon:"",Name:"Rate Premium",Url:"/master/rate",Module:"Rate",Page:false,Submenu:undefined},
                {Icon:"",Name:"Rate Sum Inured",Url:"/master/ratesuminsured",Module:"Rate",Page:false,Submenu:undefined},
                {Icon:"",Name:"Rate Approval",Url:"/master/rateapproval",Module:"Rate",Page:false,Submenu:undefined},

                // Finance & Accounting
                { Icon: "", Name: "Journal Code", Url: "/master/journalcode", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Account Code", Url: "/master/accountcode", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Bank Account", Url: "/master/bankaccount", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Accounting Model", Url: "/master/accountingmodel", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Journal Type", Url: "/master/journaltype", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Partner Type", Url: "/master/partnertype", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Business Type", Url: "/master/businesstype", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Affiliation Company", Url: "/master/affiliationcompany", Module: "Finance & Accounting", Page: false, Submenu: undefined },
                { Icon: "", Name: "Setup Accounting", Url: "/master/setupaccounting", Module: "Finance & Accounting", Page: false, Submenu: undefined },

                // General
                {Icon:"",Name:"Auto Number",Url:"/master/autonumber",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"General Setting",Url:"/master/generalsetting",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"Province",Url:"/master/province",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"City",Url:"/master/city",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"District",Url:"/master/district",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"Sub-District",Url:"/master/subdistrict",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"Bank",Url:"/master/bank",Module:"General",Page:false,Submenu:undefined},
                {Icon:"",Name:"Occupation",Url:"/master/occupation",Module:"General",Page:false,Submenu:undefined},

                // User Management
                {Icon:"",Name:"Users",Url:"/master/users",Module:"User Management",Page:false,Submenu:undefined},
                {Icon:"",Name:"Roles",Url:"/master/roles",Module:"User Management",Page:false,Submenu:undefined},
                {Icon:"",Name:"Department",Url:"/master/department",Module:"User Management",Page:false,Submenu:undefined},
                {Icon:"",Name:"Matrix Approval",Url:"/master/matrixapproval",Module:"User Management",Page:false,Submenu:undefined},
            ]},
            {
                Icon: "fa fa-briefcase", Name: "FSC", Url: "#", Module: "FSC", Page: false, Submenu: [
                    { Icon: "", Name: "New Business", Url: "/newbusiness", Module: "FSC", Page: false, Submenu: [
                        { Icon: "", Name: "New Business", Url: "/newbusiness/newbusiness", Module: "New Business", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Verification", Url: "/newbusiness/newbusinessverification", Module: "New Business", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Revision", Url: "/newbusiness/revision", Module: "New Business", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Approve", Url: "/newbusiness/approval", Module: "New Business", Page: false, Submenu: undefined },
                    ] },
                    { Icon: "", Name: "Underwriting", Url: "/underwriting", Module: "FSC", Page: false, Submenu: [
                        { Icon: "", Name: "View Underwriting", Url: "/underwriting/viewunderwriting", Module: "Underwriting", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Approve", Url: "/underwriting/approve", Module: "Underwriting", Page: false, Submenu: undefined },
                    ] },
                    { Icon: "", Name: "Policy Tracking", Url: "/policytracking/index", Module: "NFC", Page: false, Submenu: undefined },
                    { Icon: "", Name: "Contract Date", Url: "#", Module: "NFC", Page: false, Submenu: undefined },
                    { Icon: "", Name: "Reactivate", Url: "#", Module: "NFC", Page: false, Submenu: undefined },
                    { Icon: "", Name: "Tree View", Url: "#", Module: "NFC", Page: false, Submenu: undefined },
                ]
            },
            {
                Icon: "fa fa-credit-card-alt", Name: "Treasury", Url:"/treasury",Module:"Treasury",Page:false,Submenu:[
                    { Icon: "", Name: "Collection", Url: "/treasury/collection", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Collection Approval", Url: "/treasury/collectionapproval", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Upload", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Disbursement", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Cancel Payment", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Manage Suspend", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Cancel Collection", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
                    { Icon: "", Name: "Cancel Collection Approval", Url: "#", Module: "Treasury",Page:false,Submenu:undefined},
            ]},
            {
                Icon:"fa fa-handshake-o", Name: "After Sales", Url:"/billingprocess",Module:"After Sales",Page:false,Submenu:[
                    {Icon: "", Name: "Accelerated Loan Repayment", Url:"/accelerateloan",Module:"After Sales",Page:false,Submenu:[
                        { Icon: "", Name: "Surrender", Url: "/accelerateloan/surrender", Module: "Accelerated Loan Repayment", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Top Up / Refinancing", Url: "/accelerateloan/topup", Module: "Accelerated Loan Repayment", Page: false, Submenu: undefined },
                        { Icon: "", Name: "Approval", Url: "/accelerateloan/approval", Module: "Accelerated Loan Repayment",Page:false,Submenu:undefined},
                    ]},
                    {Icon:"",Name:"Loan Restructuring",Url:"/loanrestructuring",Module:"After Sales",Page:false,Submenu:[
                        { Icon: "", Name: "Loan Restructuring", Url:"/loanrestructuring/loanrestructuring",Module:"Loan Restructuring",Page:false,Submenu:undefined},
                        { Icon: "", Name: "Verification / Approval", Url:"/loanrestructuring/approval",Module:"Loan Restructuring",Page:false,Submenu:undefined},
                    ]},
                    {Icon:"",Name:"Claim",Url:"/claim",Module:"After Sales",Page:false,Submenu:[
                        { Icon: "", Name: "Registration", Url:"/claim/claim",Module:"Claim",Page:false,Submenu:undefined},
                        { Icon: "", Name: "Verification / Approval", Url:"/claim/approval",Module:"Claim",Page:false,Submenu:undefined},
                    ]},
                ]
            },
            {Icon: "fa fa-files-o", Name: "Reinsurance", Url:"/reinsurance",Module:null,Page:false,Submenu:[
                { Icon: "", Name: "New Business", Url: "/reinsurance/newbusiness", Module: "Reinsurance", Page: false, Submenu: undefined },
                { Icon: "", Name: "Surrender", Url: "/reinsurance/surrender", Module: "Reinsurance", Page: false, Submenu: undefined },
                { Icon: "", Name: "Claim", Url: "/reinsurance/claim", Module: "Reinsurance", Page: false, Submenu: undefined },
                { Icon: "", Name: "Verification / Approval", Url: "/reinsurance/approval", Module:"Reinsurance",Page:false,Submenu:undefined},
            ]},
            {Icon:"fa fa-area-chart",Name:"Report",Url:"/report",Module:null,Page:true,Submenu:[
                {Icon:"",Name:"Pending Claim",Url:"/report/pendingclaim",Module:"Claim",Page:false,Submenu:undefined},
                {Icon:"",Name:"Claim Approval",Url:"/report/claimapproval",Module:"Claim",Page:false,Submenu:undefined},
                {Icon:"",Name:"Claim TAT",Url:"#",Module:"Claim",Page:false,Submenu:undefined},
                {Icon:"",Name:"Report All Status",Url:"/report/reportallstatus",Module:"New Business / Underwriting",Page:false,Submenu:undefined},
                {Icon:"",Name:"Performance per bank",Url:"/report/performanceperbank",Module:"Report",Page:false,Submenu:undefined},
                {Icon:"",Name:"Outstanding Suspense",Url:"/report/outstandingsuspense",Module:"Report",Page:false,Submenu:undefined},
                {Icon:"",Name:"Medical Check Up Report",Url:"/report/medicalcheckup",Module:"Report",Page:false,Submenu:undefined},
                {Icon:"",Name:"Error / Adjustment / Patching Report",Url:"/report/erroradjustment",Module:"Report",Page:false,Submenu:undefined},
                {Icon:"",Name:"Surrender Report",Url:"/report/surrender",Module:"Accelerated Loan Repayment Process",Page:false,Submenu:undefined},
                {Icon:"",Name:"Monthly Collection Premium Report",Url:"/report/monthlycollectionpremi",Module:"Treasury",Page:false,Submenu:undefined},
                {Icon:"",Name:"Statistic Inforce",Url:"/report/statisticinforce",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Bordereaux",Url:"/report/bordereaux",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Claim Reass Report",Url:"/report/claimreass",Module:"Reinsurance",Page:false,Submenu:undefined},
                {Icon:"",Name:"Surrender Reass Report",Url:"/report/surrenderreass",Module:"Reinsurance",Page:false,Submenu:undefined},
            ]},
        ]
    }
}

// Navigation subscription
Navigation.Data.List.subscribe(function(val){
    Navigation.CheckActiveURL();
    if(val.length>0 && Breadcrumb.Enable()){
        Breadcrumb.Init();
    }
})