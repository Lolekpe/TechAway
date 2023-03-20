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
function jeden(){
    document.getElementById("jeden").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("jeden2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}
function dwa(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("dwa2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}
function trzy(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("trzy2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}

function cztery(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("cztery2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}

function pienc(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("pienc2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}

function szesc(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("szesc2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}

function siedem(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("siedem2").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}

function osiom(){
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = 'var(--addon-zielony)';
    document.getElementById("osiom2").style.backgroundColor = 'var(--addon-zielony)';
}

