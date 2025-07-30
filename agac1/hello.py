def kalkulyator():
    print("Sadə Kalkulyator")
    print("Əməliyyat nömrəsini seçin:")
    print("1. Toplama")
    print("2. Çıxma")
    print("3. Vurma")
    print("4. Bölmə")

    secim = input("Seçiminizi daxil edin (1/2/3/4): ")

    if secim not in ['1', '2', '3', '4']:
        print("Yanlış seçim!")
        return

    try:
        a = float(input("Birinci ədədi daxil edin: "))
        b = float(input("İkinci ədədi daxil edin: "))
    except ValueError:
        print("Zəhmət olmasa yalnız rəqəm daxil edin.")
        return

    if secim == '1':
        print(f"Nəticə: {a} + {b} = {a + b}")
    elif secim == '2':
        print(f"Nəticə: {a} - {b} = {a - b}")
    elif secim == '3':
        print(f"Nəticə: {a} * {b} = {a * b}")
    elif secim == '4':
        if b == 0:
            print("0-a bölmək olmaz!")
        else:
            print(f"Nəticə: {a} / {b} = {a / b}")

if __name__ == "__main__":
    kalkulyator()
