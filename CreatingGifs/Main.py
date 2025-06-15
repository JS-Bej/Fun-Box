import imageio.v3 as iio # Importing imageio for image processing

filenames=['0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','2','3','4','5','5','5','3','5','5','5','5','3','5','5','5','4','3','2','1']
# List of filenames in order to be used for creating the GIF

images=[]

for filename in filenames:
  images.append(iio.imread(filename+'.png')) # Reading each image file and appending it to the images list

iio.imwrite('Result.gif', images, duration=80, loop=0)  # Using imwrite(`name  of the resultant GIF`, `images`, `duration in milliseconds`, `loop`) imagio method to create a GIF.
# The `loop` parameter means how many times the GIF will loop. 0 means it will loop indefinitely.