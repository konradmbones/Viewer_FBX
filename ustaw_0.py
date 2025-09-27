from pyfbsdk import *

system = FBSystem()
take = system.CurrentTake

# pobierz czas startu i końca
start_time = take.LocalTimeSpan.GetStart()
end_time   = take.LocalTimeSpan.GetStop()

# oblicz nowy zakres (od zera)
length = end_time - start_time
new_span = FBTimeSpan(FBTime(0,0,0,0), length)

# ustaw timeline tak, żeby zaczynał się od 0
take.LocalTimeSpan = new_span

print("Timeline znormalizowany: start =", take.LocalTimeSpan.GetStart().GetSecondDouble(),
      "end =", take.LocalTimeSpan.GetStop().GetSecondDouble())
