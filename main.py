@namespace
class SpriteKind:
    background = SpriteKind.create()

def on_right_repeated():
    catcher.x += 5
controller.right.on_event(ControllerButtonEvent.REPEATED, on_right_repeated)

def throwTweet():
    global twitter_logo
    twitter_logo = sprites.create(assets.image("""
        twitterLogo
    """), SpriteKind.projectile)
    twitter_logo.set_stay_in_screen(False)
    twitter_logo.set_bounce_on_wall(False)
    twitter_logo.set_position(randint(5, 155), 0)
    twitter_logo.set_velocity(randint(-4, 4), randint(10, 60))

def on_left_repeated():
    catcher.x += -5
controller.left.on_event(ControllerButtonEvent.REPEATED, on_left_repeated)

twitter_logo: Sprite = None
catcher: Sprite = None
scene.set_background_image(assets.image("""
    ElonMidSize
"""))
game.set_dialog_text_color(8)
game.show_long_text("Catch all the tweets!", DialogLayout.TOP)
catcher = sprites.create(assets.image("""
    catcher
"""), SpriteKind.player)
catcher.set_position(80, 110)
catcher.set_stay_in_screen(True)
for index in range(21):
    throwTweet()
    pause(randint(400, 1500))