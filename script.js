// ==========================================
// 1. Mobile Navigation Menu Toggle
// ==========================================
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ==========================================
// 2. Flower Shop Management System Data
// ==========================================
const flowerCatalog = {
  Lily: {
    color: "Pink",
    size: "Small",
    price: "150.0",
    description: "Elegant and fragrant flower.",
  },
  Rose: {
    color: "Red",
    size: "Large",
    price: "160.0",
    description: "Beautiful and romantic flower.",
  },
  Sunflower: {
    color: "Yellow",
    size: "Large",
    price: "190.0",
    description: "Bright flower that faces the sun.",
  },
  Tulips: {
    color: "Violet",
    size: "Small",
    price: "120.0",
    description: "Colorful and elegant flower.",
  },
};

const javaSourceFiles = {
  "FlowerShop.java": `package Main;

import Flower_Type.*;
import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.io.IOException;

public class FlowerShop {
    private static JTextField buyerNameField, contactField, priceField;
    private static JComboBox<String> flowerCombo, colorCombo, sizeCombo;
    private static JTextArea recordsArea;
    private static JLabel descriptionLabel;
    private static JFrame frame;

    private static final Color PINK = new Color(219, 112, 147);
    private static final Color LIGHT_PINK = new Color(255, 240, 245);
    private static final Color DARK_PINK = new Color(153, 50, 90);

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> createGUI());
    }

    private static Flower createFlower(String name) throws IOException {
        switch (name) {
            case "Lily": return new Flower_Lily();
            case "Rose": return new Flower_Rose();
            case "Sunflower": return new Flower_Sunflower();
            case "Tulips": return new Flower_Tulips();
            default: throw new IllegalArgumentException("Invalid flower selection.");
        }
    }
}`,

  "Buyer.java": `package Main;

public class Buyer {
    private String buyerName;
    private String contactNumber;

    public Buyer(String buyerName, String contactNumber) {
        if (buyerName == null || buyerName.trim().isEmpty()) {
            throw new IllegalArgumentException("Buyer name cannot be empty.");
        }
        if (contactNumber == null || contactNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Contact number cannot be empty.");
        }
        this.buyerName = buyerName.trim();
        this.contactNumber = contactNumber.trim();
    }

    public String getBuyerName() { return buyerName; }
    public String getContactNumber() { return contactNumber; }
}`,

  "Flower.java": `package Flower_Type;

import java.io.IOException;

public class Flower {
    private String name;
    private String color;
    private double price;
    private String size;

    public Flower(String name, String color, double price, String size) throws IOException {
        if (name == null || name.trim().isEmpty())
            throw new IllegalArgumentException("Flower name cannot be empty.");
        if (color == null || color.trim().isEmpty())
            throw new IllegalArgumentException("Flower color cannot be empty.");
        if (size == null || size.trim().isEmpty())
            throw new IllegalArgumentException("Flower size cannot be empty.");
        if (price <= 0 || Double.isNaN(price) || Double.isInfinite(price))
            throw new IllegalArgumentException("Flower price must be a positive number.");

        this.name = name.trim();
        this.color = color.trim();
        this.price = price;
        this.size = size.trim();
    }

    public String getName() { return name; }
    public String getColor() { return color; }
    public double getPrice() { return price; }
    public String getSize() { return size; }

    public String toFileString() {
        return name + "," + color + "," + price + "," + size;
    }
}`,

  "Flower_Lily.java": `package Flower_Type;

import java.io.IOException;

public class Flower_Lily extends Flower {
    public Flower_Lily() throws IOException {
        super("lily", "pink", 150, "small");
    }

    public void displayLilyInfo() {
        displayFlowerInfo();
        System.out.println("Description: An elegant flower with a pleasant fragrance.");
    }
}`,

  "Flower_Rose.java": `package Flower_Type;

import java.io.IOException;

public class Flower_Rose extends Flower {
    public Flower_Rose() throws IOException {
        super("rose", "red", 160, "large");
    }

    public void displayRoseInfo() {
        displayFlowerInfo();
        System.out.println("Description: A beautiful and romantic flower.");
    }
}`,

  "Flower_Sunflower.java": `package Flower_Type;

import java.io.IOException;

public class Flower_Sunflower extends Flower {
    public Flower_Sunflower() throws IOException {
        super("sunflower", "yellow", 190, "large");
    }

    public void displaySunflowerInfo() {
        displayFlowerInfo();
        System.out.println("Description: A bright flower that is known for facing the sun.");
    }
}`,

  "Flower_Tulips.java": `package Flower_Type;

import java.io.IOException;

public class Flower_Tulips extends Flower {
    public Flower_Tulips() throws IOException {
        super("tulips", "violet", 120, "small");
    }

    public void displayTulipInfo() {
        displayFlowerInfo();
        System.out.println("Description: A colorful and elegant flower.");
    }
}`,

  "FlowerFileHandler.java": `package Flower_Type;

import Main.Buyer;
import java.io.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;

public class FlowerFileHandler {
    private static final Path DATA_FOLDER = Paths.get(System.getProperty("user.home"), "FlowerShopData");
    private static final Path FILE_NAME = DATA_FOLDER.resolve("flowers.txt");

    public static void savePurchase(Buyer buyer, Flower flower) throws IOException {
        Files.createDirectories(DATA_FOLDER);
        try (BufferedWriter writer = Files.newBufferedWriter(
                FILE_NAME, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
            writer.write("Buyer: " + buyer.getBuyerName()
                + ", Contact: " + buyer.getContactNumber()
                + ", " + flower.toFileString());
            writer.newLine();
        }
    }
}`
};

// Initial sample record (matches FlowerFileHandler output format)
let purchaseRecords = [
  "Buyer: Lea Mae Sapanta, Contact: 09153245973, rose,red,160.0,large\n------------------------------------------"
];

// ==========================================
// 3. Modal & Demo Controls
// ==========================================
function openFlowerModal(tab) {
  document.getElementById("flower-modal").classList.add("open");
  switchModalTab(tab);
  updateFlowerShopUI();
  loadFlowerRecords();
  showJavaFile("FlowerShop.java", document.querySelector(".file-pill"));
}

function closeFlowerModal() {
  document.getElementById("flower-modal").classList.remove("open");
}

function switchModalTab(tab) {
  const demoView = document.getElementById("modal-demo-view");
  const codeView = document.getElementById("modal-code-view");
  const tabDemo = document.getElementById("tab-demo");
  const tabCode = document.getElementById("tab-code");

  if (tab === "demo") {
    demoView.style.display = "block";
    codeView.style.display = "none";
    tabDemo.classList.add("active");
    tabCode.classList.remove("active");
  } else {
    demoView.style.display = "none";
    codeView.style.display = "block";
    tabCode.classList.add("active");
    tabDemo.classList.remove("active");
  }
}

function updateFlowerShopUI() {
  const selected = document.getElementById("fs-flower").value;
  const item = flowerCatalog[selected];
  if (!item) return;

  document.getElementById("fs-color").value = item.color;
  document.getElementById("fs-size").value = item.size;
  document.getElementById("fs-price").value = item.price;
  document.getElementById("fs-desc").textContent = item.description;
}

function purchaseFlower() {
  const buyer = document.getElementById("fs-buyer").value.trim();
  const contact = document.getElementById("fs-contact").value.trim();

  if (!buyer || !contact) {
    alert("Input Error: Please complete buyer information.");
    return;
  }

  const flowerName = document.getElementById("fs-flower").value.toLowerCase();
  const color = document.getElementById("fs-color").value.toLowerCase();
  const size = document.getElementById("fs-size").value.toLowerCase();
  const price = document.getElementById("fs-price").value;

  const entry = `Buyer: ${buyer}, Contact: ${contact}, ${flowerName},${color},${price},${size}\n------------------------------------------`;
  purchaseRecords.push(entry);

  alert(
    `Purchase successfully saved!\n\nBuyer: ${buyer}\nFlower: ${flowerName}\nPrice: ₱${price}`
  );

  loadFlowerRecords();
  document.getElementById("fs-buyer").value = "";
  document.getElementById("fs-contact").value = "";
}

function clearFlowerForm() {
  document.getElementById("fs-buyer").value = "";
  document.getElementById("fs-contact").value = "";
  document.getElementById("fs-flower").selectedIndex = 0;
  updateFlowerShopUI();
}

function loadFlowerRecords() {
  const area = document.getElementById("fs-records");
  area.value = purchaseRecords.length
    ? purchaseRecords.join("\n")
    : "No purchase records found.";
}

function showJavaFile(fileName, btnEl) {
  document.getElementById("java-code-display").textContent =
    javaSourceFiles[fileName] || "";
  document
    .querySelectorAll(".file-pill")
    .forEach((pill) => pill.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
}

// Close modal when clicking outside the modal box
window.addEventListener("click", (e) => {
  const modal = document.getElementById("flower-modal");
  if (e.target === modal) {
    closeFlowerModal();
  }
});