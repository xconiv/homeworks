import ferrari as fr
ff={
    '1':fr.bolunurmu,
    '2':fr.ucunnen_boyuyu, 
    '3':fr.faktorial,
    '4':fr.calc,
    '5':fr.n_e_qeder_topla
}
while True:
    em=input(fr.__doc__)
    if em=='6' or em.lower()=='exit' or em.lower()=='quit':
        break
    if em in ff:
        if em=='1':
            try:
                a=int(input("bolunen: "))
                b=int(input("bolen: "))
            except ValueError:
                print("xeta")
            print(ff[em](a,b))
        elif em=='2':
            try:
                a=int(input("a: "))
                b=int(input("b: "))
                c=int(input("c: "))
            except ValueError:
                print("xeta")
            print(ff[em](a,b,c))
        elif em=='3':
            try:
                n=int(input("n: "))
            except ValueError:
                print("xeta")
            print(ff[em](n))
        elif em=='4':
            try:
                a=int(input("a: "))
                symbol=input("symbol: ")
                b=int(input("b: "))
            except ValueError:  
                print("xeta")
            print(ff[em](a,symbol,b))
        elif em=='5':
            try:
                n=int(input("n: "))
            except ValueError:
                print("xeta")
            print(ff[em](n))
    if em not in ff and em!='6':
        print("duzgun emeliyyat sec")
    kec=input("\nnext")
    print("------------------------------------")
print("\_|_/")