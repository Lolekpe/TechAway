function zmiana(){
            
           
    if (document.getElementById('navbar').style.width == '150px') {
    document.getElementById("strzalka").style.marginLeft = '30px';
    document.getElementById("strzalka").style.transform = 'rotate(0deg)';
    document.getElementById("logo").style.width = '60px';
    document.getElementById("litery").style.display = 'none';

    setTimeout(() => {
    document.getElementById("ikony").style.display = 'block';
    document.getElementById("navbar").style.width = '80px';


    },200)

}else
{
    document.getElementById("navbar").style.width = '150px';
    document.getElementById("strzalka").style.marginLeft = '100px';
    document.getElementById("strzalka").style.transform = 'rotate(180deg)';
    document.getElementById("logo").style.width = '100px';
    document.getElementById("ikony").style.display = 'none';

    setTimeout(() => {
        document.getElementById("litery").style.display = 'block';

    },200)
}
}


