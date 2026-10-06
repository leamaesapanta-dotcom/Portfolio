package Main;
import java.util.Scanner;

import Flower_Type.Flower;
import Flower_Type.Flower_Lily;
import Flower_Type.Flower_Rose;
import Flower_Type.Flower_Sunflower;
import Flower_Type.Flower_Tulips;

public class FlowerShop {
    public static void main(String[] args) {
        public static void main(String[] args) {
        Scanner input = new
    Scanner(System.in);
        System.out.print("Enter flower name : ");
        String name = input.nextLine();
        System.out.print("Enter flower color: ");
        String color= input.nextLine();
        System.out.print("Enter flower size: ");
        String size = input.nextLine();
        System.out.print("Enter flower price: ");
        double price = input.nextLine();
        
        Flower flower = new Flower(name, color, price, size);

        System.out.println();
        System.out.println(flower);

        input.close();
        

        Flower_Lily lily = new Flower_Lily();

        Flower_Rose rose  = new Flower_Rose();

        Flower_Sunflower sunflower = new Flower_Sunflower();

        Flower_Tulips tulips = new Flower_Tulips();

        System.out.println("================================");
        System.out.println("        JAVA FLOWER SHOP");
        System.out.println("================================");

        System.out.println("\n--- ROSE ---");
        rose.displayRoseInfo();

        System.out.println("\n--- TULIP ---");
        tulips.displayTulipInfo();

        System.out.println("\n--- SUNFLOWER ---");
        sunflower.displaySunflowerInfo();

        System.out.println("\n--- LILY ---");
        lily.displayLilyInfo();
    }
}
