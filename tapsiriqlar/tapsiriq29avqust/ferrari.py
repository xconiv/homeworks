"""emeliyyatlar\n >>> (1) bolunurmu(bolunen, bolen)\n >>> (2) ucunnen_boyuyu(a,b,c)\n >>> (3) faktorial(n)\n >>> (4) calc(a,symbol,b)\n >>> (5) n_e_qeder_topla(n)\n>>> (6) exit()\n>>> """

def bolunurmu(bolunen, bolen):
    """eded edede tam bolunurmu"""
    if bolunen == int(bolunen) and bolen == int(bolen):
        if bolen == 0:
            return "Xeta"
        elif bolunen % bolen == 0:
            return f"{bolunen} {bolen} e bolunur"
        else:
            return f"{bolunen} {bolen} e bolunmur qaliq {bolunen % bolen}"
    

def ucunnen_boyuyu(a,b,c):

    """uc ededden boyuyunu qaytarir >>> a, b, c"""
    if a == int(a) and b == int(b) and c == int(c):
        if a<=b:
            a=b
        if a<=c:
            a=c
        return a

def faktorial(n):
    """n-in faktorialini qaytarir >>> n"""
    if n==int(n) and n>=0:
        if n==0 or n==1:
            return 1
        else:
            return n*faktorial(n-1)
    
def calc(a,symbol,b):
    """hesablama aparir >>> a,symbol,b"""
    if a==int(a) and b==int(b) :
        salam = {
            '+': lambda x,y: x+y,
            '-': lambda x,y: x-y,
            '*': lambda x,y: x*y,
            '**': lambda x,y: x**y,
            '%': lambda x,y: x%y,
            '/': lambda x,y: "Xeta" if y==0 else x/y
        }
        c=salam.get(symbol)
        if c is None:
            return "duzgun isare qoy"
        return c(a,b)

def n_e_qeder_topla(n):
    """n>1 den n-e, n<-1 n den -1 qeder ededleri toplayir >>> n"""
    if n==int(n):
        if n>=1:
            return n*(n+1)//2
        elif n<=-1:
            return n*(n-1)//2*(-1)
        else:
            return 0