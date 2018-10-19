/**********************************
 *          ALL DATA              *
 *  write your CustomerDB Object  *
 *      BELOW this Object         *
 **********************************/

var allData = [
    {type:"store", data:{store_id: 297, name: "Scotiabank - Main Branch", address_id: 1023}},
    {type:"store", data:{store_id: 614, name: "Scotiabank - Hamilton", address_id: 1984}},
    {type:"store", data:{store_id: 193, name: "Scotiabank - Mississauga", address_id: 1757}},
    {type:"customer", data:{customer_id: 26, store_id:297, first_name: "Dave", last_name: "Bennett", email: "dbennett@gmail.com", address_id: 4536, add_date: null}},
    {type:"customer", data:{customer_id: 59, store_id:193, first_name: "John", last_name: "Stevens", email: "jstevens22@hotmail.com", address_id: 2473, add_date: null}},
    {type:"customer", data:{customer_id: 29, store_id:614, first_name: "Sarah", last_name: "Pym", email: "spym99@hotmail.com", address_id: 1611, add_date: null}},
    {type:"customer", data:{customer_id: 63, store_id:297, first_name: "Steven", last_name: "Edwards", email: "steven2231@hotmail.com", address_id: 1836, add_date: null}},
    {type:"customer", data:{customer_id: 71, store_id:614, first_name: "Martin", last_name: "Scott", email: "mdog33@gmail.com", address_id: 2727, add_date: null}},
    {type:"customer", data:{customer_id: 24, store_id:614, first_name: "Jonathan", last_name: "Pym", email: "jjpym@yahoo.ca", address_id: 1611, add_date: null}},
    {type:"customer", data:{customer_id: 36, store_id:193, first_name: "Kaitlyn", last_name: "Adams", email: "katy38@hotmail.com", address_id: 5464, add_date: null}},
    {type:"customer", data:{customer_id: 73, store_id:297, first_name: "Melissa", last_name: "Bennett", email: "mbennett@gmail.com", address_id: 4536, add_date: null}},         
    {type:"address", data:{address_id: 1023, address: "2895 Yonge St.", city:"Toronto", province:"ON", postal_code:"L4C02G"}},
    {type:"address", data:{address_id: 1984, address: "3611 Main St. West", city:"Hamilton", province:"ON", postal_code:"R5O8H5"}},
    {type:"address", data:{address_id: 1757, address: "1177 Ontario St. Unit 8", city:"Mississauga", province:"ON", postal_code:"L9H6B3"}},
    {type:"address", data:{address_id: 4536, address: "3945 John St.", city: "Ajax", province: "ON", postal_code: "L7M4T9"}},
    {type:"address", data:{address_id: 2473, address: "391 Baker St. Apt 231", city: "Mississauga", province: "ON", postal_code: "M4T8S3"}},
    {type:"address", data:{address_id: 1611, address: "183 City Ct.", city: "Hamilton", province: "ON", postal_code: "J3T9V2"}},
    {type:"address", data:{address_id: 1836, address: "67 Rhymer Ave.", city: "Stouffville", province: "ON", postal_code: "L3C8H4"}},
    {type:"address", data:{address_id: 2727, address: "287 Brant St. Apt 4A", city: "Waterdown", province: "ON", postal_code: "R93G3P"}},
    {type:"address", data:{address_id: 5464, address: "11 New St. Apt 2B", city: "Brampton", province: "ON", postal_code: "L694R7"}},
];

 /*  Write your CustomerDB Object Here.  Do not forget to uncomment the "TEST DATA" section
     when you're ready.  Your code is required to run against these tests before you submit */


var CustomerDB = {
    customers: [],
    addresses: [],
    stores: [],
    insertData: function(allData) {
        allData.forEach(data => {
            if (data.type === 'customer')
                this.addCustomer(data);
            if (data.type === 'store')
                this.addStore(data);
            if (data.type === 'address') 
                this.addAddress(data);
        });
    },
    
    addCustomer: function(customerObj) {
        let date = new Date();
        customerObj.data.add_date = date.toUTCString();
        this.customers.push(customerObj);
    },
    
    outputCustomerById: function(customer_id) {
        
        // Filter out and find the customer that matches the 'customer_id' that is passed as an argument above
        let customer = this.customers.filter(customer => customer.data.customer_id == customer_id);
        
        // Find the address id needed
        let addressIdToFind = customer[0].data.address_id;

        // Find the address details of the customer currently working with ... return their address
        let customerAddress = this.addresses.filter(address => {
            if (address.data.address_id == addressIdToFind)
                return address;
        });

        // Output
        console.log(`Customer ${customer[0].data.customer_id}: ${customer[0].data.first_name} ${customer[0].data.last_name} (${customer[0].data.email})`);
        console.log(`Home Address: ${customerAddress[0].data.address} ${customerAddress[0].data.city}, ${customerAddress[0].data.province}. ${customerAddress[0].data.postal_code}`);
        console.log(`Joined: ${customer[0].data.add_date}\n\n`);
    },
    
    outputAllCustomers: function() {
        console.log(`All Customers\n\n`);

        // For each customer, execute the outputCustomerById(...) method
        this.customers.forEach(customer => {
            this.outputCustomerById(customer.data.customer_id);
        });
    },
    
    outputCustomersByStore: function(store_id) {
        let customersWithStore_Id = this.customers.filter(customer => customer.data.store_id == store_id);
        // let store = this.getStoreById(store_id);

        customersWithStore_Id.forEach(customer => {
            console.log(`Customer ${customer.data.customer_id}: ${customer.data.first_name} ${customer.data.last_name} (${customer.data.email})`);

            let address = this.getAddressById(customer.data.address_id);
            console.log(`Home address: ${address[0].data.city}, ${address[0].data.province}. ${address[0].data.postal_code}`);
            console.log(`Joined: ${customer.data.add_date}\n\n`);
        })
    },
    
    removeCustomerById: function(customer_id) {
        let customerWithId = this.customers.filter(customer => customer.data.customer_id == customer_id);
        
        // Find the index of the customers where data.customer_id == customer_id
        let position = this.customers.findIndex(i => i.data.customer_id == customer_id);

        // Check if the address is not being used by another customer
        let customersMatchingAddress = 0;
        
        // Check the customer's array if there's another customer that is using the same address_id, if so, increase the counter
        this.customers.forEach(customer => {
            if (customer.data.address_id == customerWithId[0].data.address_id)
            customersMatchingAddress++;
        });

        // If there's only 1 match (for the current customer), allow the delete
        if (customersMatchingAddress == 1) {
            this.customers.splice(position, 1);

            // Find the index of the customer's address_id in the addresses array, delete that element as well
            this.removeAddressById(customerWithId[0].data.address_id);
        } 

        // If there's another match with the address, just delete the customer, not the
        if (customersMatchingAddress > 1)
            this.customers.splice(position, 1);
    },
    
    addAddress: function(address) {
        this.addresses.push(address);
    },
    
    getAddressById: function(address_id) {
        let addressWithId = this.addresses.filter(address => {
            if (address_id === address.data.address_id)
                return address.data;
        });

        return addressWithId;
    },
    
    outputAllAddresses: function() {
        console.log(`All Addresses\n\n`);
        this.addresses.forEach(function(address) {
            console.log(`Address ${address.data.address_id}: ${address.data.address} ${address.data.city}, ${address.data.province}. ${address.data.postal_code}\n`)
        });
    },
    
    removeAddressById: function(address_id) {
        let positionInAddresses = this.addresses.findIndex(i => i.data.address_id == address_id);
            this.addresses.splice(positionInAddresses, 1);
    },
    
    addStore: function(storeObj) {
        this.stores.push(storeObj);
    },
    
    getStoreById: function(store_id) {
        let store = this.stores.filter(store => store.data.store_id == store_id);
        console.log(store);
    },
    
    outputAllStores: function() {
        console.log(`All Stores\n\n`);
        
        this.stores.forEach(store => {
            let storeAddressDetails = this.getAddressById(store.data.address_id);
            console.log(`Store ${store.data.store_id}: ${store.data.name}`);
            console.log(`Location: ${storeAddressDetails[0].data.address} ${storeAddressDetails[0].data.city}, ${storeAddressDetails[0].data.province}. ${storeAddressDetails[0].data.postal_code}\n\n`);
        });
    }
};

/**********************************
 *          TEST DATA             *
 *  write your CustomerDB Object  *
 *      ABOVE this code           *
 *                                *
 *  Uncomment this block of code  *
 *  when you're ready to test     *
 *  your CustomerDB Object        *
 *                                *
 *  You MUST Hand in your code    *
 *  with the test data            *
 *  uncommented, as this will     *
 *  help check your code for      *
 *  correctness                   *
 **********************************/

/* */

// Insert all Data into the Database

CustomerDB.insertData(allData);

// output all customers

console.log("CustomerDB.outputAllCustomers();\n\n--------------------------\n\n");
CustomerDB.outputAllCustomers();
console.log("--------------------------\n\n");

// output all addresses

console.log("CustomerDB.outputAllAddresses();\n\n--------------------------\n\n");
CustomerDB.outputAllAddresses();
console.log("--------------------------\n\n"); 

// output all stores

console.log("CustomerDB.outputAllStores();\n\n--------------------------\n\n");
CustomerDB.outputAllStores();
console.log("--------------------------\n\n"); 

// output all customers in the "Main Branch"

console.log("CustomerDB.outputCustomersByStore(297);\n\n--------------------------\n\n");
CustomerDB.outputCustomersByStore(297);
console.log("--------------------------\n\n"); 

// remove Customer Dave Bennett (customer_id 26) and Martin Scott (customer_id 71)

console.log("CustomerDB.removeCustomerById(26);\nCustomerDB.removeCustomerById(71);\n\n");
CustomerDB.removeCustomerById(26);
CustomerDB.removeCustomerById(71);
console.log("--------------------------\n\n"); 

// output all customers again
// NOTE: Dave Bennett and Martin Scott should be missing

console.log("CustomerDB.outputAllCustomers();\n\n--------------------------\n\n");
CustomerDB.outputAllCustomers();
console.log("--------------------------\n\n");

// output all addresses again
// NOTE: only addrss 287 Brant St. Apt 4A Waterdown, ON. R93G3P should be missing

console.log("CustomerDB.outputAllAddresses();\n\n--------------------------\n\n");
CustomerDB.outputAllAddresses();
console.log("--------------------------\n\n"); 

// */
