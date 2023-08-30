@namespace
class SpriteKind:
    background = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    catcher.start_effect(effects.confetti, 250)
    sprite.say_text(":)", 200)
    sprites.destroy(sprite, effects.disintegrate, 50)
    music.play(music.melody_playable(music.magic_wand), music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.player, on_on_overlap)

def on_on_overlap_enemy(sprite, otherSprite):
    catcher.start_effect(effects.fire, 250)
    sprites.destroy(sprite, effects.halo, 50)
    music.play(music.melody_playable(music.big_crash), music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.player, on_on_overlap_enemy)

def on_right_repeated():
    catcher.x += 10
controller.right.on_event(ControllerButtonEvent.REPEATED, on_right_repeated)

def on_left_pressed():
    catcher.x += -10
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    catcher.x += 10
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def throwTweet():
    global twitter_logo
    if randint(0, 1) == 0:
        twitter_logo = sprites.create(assets.image("""
                twitterLogoR
            """),
            SpriteKind.projectile)
    else:
        twitter_logo = sprites.create(assets.image("""
                twitterLogoL
            """),
            SpriteKind.projectile)
    twitter_logo.set_stay_in_screen(False)
    twitter_logo.set_bounce_on_wall(False)
    twitter_logo.set_position(randint(5, 155), 0)
    twitter_logo.set_velocity(randint(-4, 4), randint(10, 60))

def throwX():
    global x_logo
    x_logo.set_stay_in_screen(True)
    x_logo.set_bounce_on_wall(True)
    x_logo.set_position(randint(5, 155), 0)
    x_logo.set_velocity(randint(-4, 4), randint(10, 60))

def on_on_destroyed(sprite2):
    info.set_score(info.score() + 100)
sprites.on_destroyed(SpriteKind.projectile, on_on_destroyed)

def on_left_repeated():
    catcher.x += -10
controller.left.on_event(ControllerButtonEvent.REPEATED, on_left_repeated)

def start():
    music.set_volume(50)
    info.set_score(0)
    scene.set_background_image(assets.image("""
        ElonMidSize
    """))
    game.set_dialog_text_color(8)
    game.show_long_text("Catch all the tweets before they fall!", DialogLayout.TOP)
    catcher.set_position(80, 110)
    catcher.set_stay_in_screen(True)
    index = 0
    while index <= randint(15, 45):
        if randint(0, 1) == 0:
            throwTweet()
        else:
            throwX()
        pause(randint(400, 1500))
        index += 1
    pause(2000)
    game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
    game.game_over(True)
    game.set_game_over_effect(True, effects.confetti)

twitter_logo: Sprite = None
x_logo: Sprite = None
x_logo = sprites.create(assets.image("""
        xLogo
    """), SpriteKind.enemy)
catcher: Sprite = None
catcher = sprites.create(assets.image("""
        catcher
    """), SpriteKind.player)
start()