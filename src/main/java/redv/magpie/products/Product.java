package redv.magpie.products;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "data_product")
@NoArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private String fileName;
  private String contentType;

  @Column(length = 16777216) // 16MB file size to match MySQL mediumblob size from the DB, next larger is 4GB
  private byte[] data;

  private Timestamp deleted;

  public Product(long rfiId, String fileName, String contentType, byte[] data) {
    this.rfiId = rfiId;
    this.fileName = fileName;
    this.contentType = contentType;
    this.data = data;
    this.deleted = null;
  }
}
