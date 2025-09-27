from pyfbsdk import *

# Pobierz system
system = FBSystem()

# Timeline / Transport info
start_time = system.CurrentTake.LocalTimeSpan.GetStart()
end_time   = system.CurrentTake.LocalTimeSpan.GetStop()

fps = FBPlayerControl().GetTransportFpsValue()

def time_to_frame(time, fps):
    return int(round(time.GetSecondDouble() * fps))

print("FPS:", fps)
print("Start time:", start_time.GetSecondDouble(), "s")
print("End time:",   end_time.GetSecondDouble(), "s")
print("Start frame:", time_to_frame(start_time, fps))
print("End frame:",   time_to_frame(end_time, fps))

# Wartość przesunięcia
offset = time_to_frame(start_time, fps)
print("Frame offset (do odjęcia):", offset)
