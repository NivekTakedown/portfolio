# **EasyCoffee**

The Easy Coffee App is designed to help coffee farm owners and workers manage various aspects of their coffee plantation. It allows users to:

  * Register farm information like lots, trees, and workers
  * Track coffee production and sales
  * Monitor inventory of supplies and inputs
  * Record daily progress notes
  * View geospatial maps of farm lots

The app has different user roles like an admin who has full access and auxiliary users with limited access. Key features include production tracking per worker, recommended supplies per lot, sales and accounting records, pest and plant info sheets, and aerial views of the farm mapped to lot data.

## **Technical description**

  * The app is built using a Model-View-Controller (MVC) architecture to separate data, UI, and logic components.
  * It uses Java 8, JFrame for the UI, Maven for dependency management, and H2 Database as the database management system.
  * The system has two main user roles - admin and auxiliary users. The admin has full access while auxiliary users have limited permissions.
  Key modules and features:
    *  User management - register, edit, deactivate users
    *  Farm management - add, edit farm lots and tree data
    *  Production tracking - log worker yield per lot
    *  Plant/pest info sheets - reference info from external sources
    *  Inventory tracking - record stock and purchases of supplies
    *  Sales and accounting - record coffee sales and expenses
    *  Daily progress notes - memo style text entries by date
    *  Geospatial visualization - interactive maps of farm lots
  * The system generates insights and recommendations for users based on data like lot size, tree age, external best practices etc.
  * Statistical dashboards and reports provide visual data analytics to improve productivity and profitability.
  * The source code is available on GitHub under the **Apache 2.0 license**. The app can run as an executable .exe for Windows.

## **Manuals**
## PDF Manual

[User Manual](ManualdeUsuario.pdf)
[Technical Manual](ManualTécnico.pdf)

This project was developed in collaboration with three other team members.

## **Prototipe**

If you're interested in trying out the EasyCoffee app, you can download the executable file by clicking on the following [link](/showcase/sketches/files/EasyCoffee.exe).
```

Con estos cambios, el componente `PdfViewer` se encargará de mostrar los archivos PDF embebidos en la página de detalle del proyecto (`ProjectDetail`) con nombres variables. Asegúrate de que los archivos PDF estén ubicados en la carpeta `public/manuals` y que los nombres de los archivos coincidan con los especificados en los archivos `.md` de los proyectos.
