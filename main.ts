namespace SpriteKind {
    export const background = SpriteKind.create()
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    catcher.x += 5
})
function throwTweet () {
    twitter_logo = sprites.create(assets.image`twitterLogo`, SpriteKind.Projectile)
    twitter_logo.setStayInScreen(false)
    twitter_logo.setBounceOnWall(false)
    twitter_logo.setPosition(randint(5, 155), 0)
    twitter_logo.setVelocity(randint(-4, 4), randint(10, 60))
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    catcher.x += -5
})
let twitter_logo: Sprite = null
let catcher: Sprite = null
scene.setBackgroundImage(assets.image`ElonMidSize`)
game.setDialogTextColor(8)
game.showLongText("Catch all the tweets!", DialogLayout.Top)
catcher = sprites.create(assets.image`catcher`, SpriteKind.Player)
catcher.setPosition(80, 110)
catcher.setStayInScreen(true)
for (let index = 0; index <= 20; index++) {
    throwTweet()
    pause(randint(400, 1500))
}
