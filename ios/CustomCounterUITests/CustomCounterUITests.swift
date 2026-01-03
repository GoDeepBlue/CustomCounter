import XCTest

@MainActor
class CustomCounterUITests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
    }

    override func tearDownWithError() throws {
        app = nil
    }

    // MARK: - Main Test for All Screenshots (Light Mode)

    func testCaptureAllScreens() throws {
        // Wait for React Native app to fully load (including splash screen)
        sleep(5)

        // 1. Capture Home Screen (Main Counter)
        snapshot("01_HomeScreen")

        // 2. Tap the counter pad a few times to show a count
        tapCounterPad(times: 3)
        sleep(1)
        snapshot("02_HomeScreen_WithCount")

        // 3. Navigate to Settings Screen (modal)
        navigateToSettings()
        sleep(2)
        snapshot("03_SettingsScreen")
        dismissModal()

        // 4. Navigate to Save Count Screen (modal)
        navigateToSaveCount()
        sleep(2)
        snapshot("04_SaveCountScreen")
        dismissModal()

        // 5. Navigate to Get Counts Screen (modal)
        navigateToGetCounts()
        sleep(2)
        snapshot("05_GetCountsScreen")
    }

    // MARK: - Dark Mode Screenshots Test

    func testCaptureDarkModeScreens() throws {
        // Wait for React Native app to fully load
        sleep(5)

        // First, turn ON Dark Mode
        navigateToSettings()
        sleep(2)
        toggleDarkMode()
        sleep(1)
        snapshot("06_SettingsScreen_Dark")
        dismissModal()
        sleep(1)

        // Capture Home Screen in Dark Mode
        snapshot("07_HomeScreen_Dark")

        // Tap counter to show count in dark mode
        tapCounterPad(times: 3)
        sleep(1)
        snapshot("08_HomeScreen_WithCount_Dark")

        // Capture Save Count Screen in Dark Mode
        navigateToSaveCount()
        sleep(2)
        snapshot("09_SaveCountScreen_Dark")
        dismissModal()

        // Capture Get Counts Screen in Dark Mode
        navigateToGetCounts()
        sleep(2)
        snapshot("10_GetCountsScreen_Dark")
        dismissModal()

        // Turn OFF Dark Mode (restore to light mode)
        navigateToSettings()
        sleep(2)
        toggleDarkMode()
        sleep(1)
        dismissModal()
    }

    // MARK: - Combined Light and Dark Mode Test

    func testCaptureAllScreensWithThemes() throws {
        // Wait for React Native app to fully load
        sleep(5)

        // === LIGHT MODE SCREENSHOTS ===

        // Home Screen - Light
        snapshot("Light_01_HomeScreen")

        // Home Screen with count - Light
        tapCounterPad(times: 3)
        sleep(1)
        snapshot("Light_02_HomeScreen_WithCount")

        // Settings Screen - Light
        navigateToSettings()
        sleep(2)
        snapshot("Light_03_SettingsScreen")

        // Turn ON Dark Mode while in Settings
        toggleDarkMode()
        sleep(1)

        // === DARK MODE SCREENSHOTS ===

        // Settings Screen - Dark
        snapshot("Dark_03_SettingsScreen")
        dismissModal()
        sleep(1)

        // Home Screen - Dark (with count still showing)
        snapshot("Dark_02_HomeScreen_WithCount")

        // Reset counter and capture clean home
        navigateToSettings()
        sleep(1)
        dismissModal()
        sleep(1)

        // Save Count Screen - Dark
        navigateToSaveCount()
        sleep(2)
        snapshot("Dark_04_SaveCountScreen")
        dismissModal()

        // Get Counts Screen - Dark
        navigateToGetCounts()
        sleep(2)
        snapshot("Dark_05_GetCountsScreen")
        dismissModal()

        // Turn OFF Dark Mode (restore)
        navigateToSettings()
        sleep(2)
        toggleDarkMode()
        sleep(1)
        dismissModal()

        // === REMAINING LIGHT MODE SCREENSHOTS ===

        // Save Count Screen - Light
        navigateToSaveCount()
        sleep(2)
        snapshot("Light_04_SaveCountScreen")
        dismissModal()

        // Get Counts Screen - Light
        navigateToGetCounts()
        sleep(2)
        snapshot("Light_05_GetCountsScreen")
    }

    // MARK: - Individual Screen Tests

    func testHomeScreenSnapshot() throws {
        sleep(5)
        snapshot("HomeScreen")
    }

    func testSettingsScreenSnapshot() throws {
        sleep(5)
        navigateToSettings()
        sleep(2)
        snapshot("SettingsScreen")
    }

    func testSaveCountScreenSnapshot() throws {
        sleep(5)
        tapCounterPad(times: 5)
        sleep(1)
        navigateToSaveCount()
        sleep(2)
        snapshot("SaveCountScreen")
    }

    func testGetCountsScreenSnapshot() throws {
        sleep(5)
        navigateToGetCounts()
        sleep(2)
        snapshot("GetCountsScreen")
    }

    // MARK: - Navigation Helper Methods

    /// Navigate to Settings screen
    private func navigateToSettings() {
        let settingsButton = findElement(withIdentifier: "settingsButton")
        if settingsButton.waitForExistence(timeout: 5) {
            settingsButton.tap()
        } else {
            // Fallback: tap settings icon position
            app.coordinate(withNormalizedOffset: CGVector(dx: 0.93, dy: 0.08)).tap()
        }
    }

    /// Navigate to Save Count screen
    private func navigateToSaveCount() {
        let saveButton = findElement(withIdentifier: "saveCountButton")
        if saveButton.waitForExistence(timeout: 5) {
            saveButton.tap()
        } else {
            app.coordinate(withNormalizedOffset: CGVector(dx: 0.64, dy: 0.08)).tap()
        }
    }

    /// Navigate to Get Counts screen
    private func navigateToGetCounts() {
        let listButton = findElement(withIdentifier: "getCountsButton")
        if listButton.waitForExistence(timeout: 5) {
            listButton.tap()
        } else {
            app.coordinate(withNormalizedOffset: CGVector(dx: 0.79, dy: 0.08)).tap()
        }
    }

    /// Toggle Dark Mode switch in Settings
    private func toggleDarkMode() {
        let darkModeSwitch = findElement(withIdentifier: "darkModeSwitch")
        if darkModeSwitch.waitForExistence(timeout: 5) {
            darkModeSwitch.tap()
        } else {
            // Fallback: try to find switch by type
            let switches = app.switches
            if switches.count > 0 {
                switches.firstMatch.tap()
            } else {
                // Last resort: tap approximate position of dark mode switch
                app.coordinate(withNormalizedOffset: CGVector(dx: 0.9, dy: 0.18)).tap()
            }
        }
    }

    // MARK: - Utility Helper Methods

    /// Tap the counter pad multiple times
    private func tapCounterPad(times: Int) {
        let counterPad = findElement(withIdentifier: "counterPad")
        if counterPad.waitForExistence(timeout: 5) {
            for _ in 0..<times {
                counterPad.tap()
                usleep(200000) // 0.2 seconds between taps
            }
        } else {
            // Fallback: tap center-bottom area of the screen
            let centerCoordinate = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.65))
            for _ in 0..<times {
                centerCoordinate.tap()
                usleep(200000)
            }
        }
    }

    /// Find element by accessibility identifier across different element types
    private func findElement(withIdentifier identifier: String) -> XCUIElement {
        // React Native elements can appear as different types
        // Try switches first for dark mode toggle
        let switchElement = app.switches[identifier]
        if switchElement.exists {
            return switchElement
        }

        // Try buttons (most common for Pressable)
        let button = app.buttons[identifier]
        if button.exists {
            return button
        }

        // Try other elements
        let other = app.otherElements[identifier]
        if other.exists {
            return other
        }

        // Try images
        let image = app.images[identifier]
        if image.exists {
            return image
        }

        // Try static texts
        let text = app.staticTexts[identifier]
        if text.exists {
            return text
        }

        // Return any element with this identifier
        return app.descendants(matching: .any)[identifier]
    }

    /// Dismiss a modal screen - try multiple methods
    private func dismissModal() {
        sleep(1)

        // Method 1: Try to find and tap a close/back button in navigation bar
        let navButtons = app.navigationBars.buttons
        if navButtons.count > 0 {
            // Try common close button names
            for buttonName in ["Close", "Done", "Cancel", "Back"] {
                let closeButton = navButtons[buttonName]
                if closeButton.exists && closeButton.isHittable {
                    closeButton.tap()
                    sleep(1)
                    return
                }
            }
            // Try first button in nav bar
            let firstButton = navButtons.firstMatch
            if firstButton.exists && firstButton.isHittable {
                firstButton.tap()
                sleep(1)
                return
            }
        }

        // Method 2: Swipe down to dismiss modal (iOS modal gesture)
        let topOfScreen = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.2))
        let bottomOfScreen = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.9))
        topOfScreen.press(forDuration: 0.1, thenDragTo: bottomOfScreen)
        sleep(1)
    }
}
