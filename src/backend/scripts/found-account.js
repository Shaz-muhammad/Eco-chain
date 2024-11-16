async function main() {
    const [deployer, recipient] = await ethers.getSigners();
    
    console.log("Funding recipient address:", recipient.address);
    
    const tx = {
      to: recipient.address,
      value: ethers.utils.parseEther("10"), // Amount to transfer
    };
  
    const txResponse = await deployer.sendTransaction(tx);
    console.log("Transaction hash:", txResponse.hash);
  
    await txResponse.wait();
    console.log("Transaction confirmed");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  